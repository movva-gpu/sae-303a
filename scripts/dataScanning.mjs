import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.join(import.meta.dirname, '..', 'data');

const GeoJSONContent = fs.readFileSync(
  path.join(dataPath, 'consolidation.geo.json'), { encoding: 'utf-8', flag: 'r' }
);
const GeoJSON = JSON.parse(GeoJSONContent);

if (!GeoJSON) {
  console.error('Something went wrong when parsing consolidation.geo.json.');
  process.exit(1);
}

let addMap = generateAddMap(GeoJSON);
let totalMap = generateTotalMap(generateAddMap(GeoJSON));

if (!addMap) process.exit(1);
if (!totalMap) process.exit(1);

addMap = toSimpleFormat(addMap);
totalMap = toSimpleFormat(totalMap);

const addMapJSON = JSON.stringify(addMap);
const totalMapJSON = JSON.stringify(totalMap);

const addMapFilename = 'addmap.json';
const totalMapFilename = 'totalmap.json';

const addMapPath = path.join(dataPath, addMapFilename);
const totalMapPath = path.join(dataPath, totalMapFilename);

const addMapFile = fs.openSync(addMapPath, 'w');
fs.writeSync(addMapFile, addMapJSON, 0, 'utf-8');
fs.closeSync(addMapFile);

const totalMapFile = fs.openSync(totalMapPath, 'w');
fs.writeSync(totalMapFile, totalMapJSON, 0, 'utf-8');
fs.closeSync(totalMapFile);

function generateAddMap(geojson) {
  const features = geojson.features;
  let result = {};
  if (features === undefined) {
    console.error('Error: GeoJSON doesn\'t contain a `features` field.');
    return false;
  }

  for (const feature of features) {
    let props = feature.properties;
    props.coordinates = feature.geometry.coordinates;
    const year = (new Date(props.created_at)).getFullYear();

    if (result[year] === undefined) {
      result[year] = [];
    }

    let foundIndex = 0;
    let foundCoords = [];
    let res = result[year].find((feat, i) => {
      if (
        Math.abs(feat.long - (props.consolidated_longitude ?? props.coordinates[0])) > 0.4 ||
        Math.abs(feat.lat - (props.consolidated_latitude ?? props.coordinates[1])) > 0.33
      ) return false;

      foundIndex = i;
      foundCoords = [
        (props.consolidated_longitude ?? props.coordinates[0]),
        (props.consolidated_latitude ?? props.coordinates[1]),
      ];
      return true;
    });

    if (res !== undefined) {
      result[year][foundIndex].count++;
      result[year][foundIndex].long = (result[year][foundIndex].long + foundCoords[0]) / 2
      result[year][foundIndex].lat = (result[year][foundIndex].lat + foundCoords[1]) / 2
      continue;
    }

    result[year].push({
      long: props.consolidated_longitude ?? props.coordinates[0],
      lat: props.consolidated_latitude ?? props.coordinates[1],
      count: 1,
    });
  }

  return result;
}

function generateTotalMap(addMap) {
  const addMapC = addMap;
  let firstYear;
  let result = {};
  let i = 0;
  for (let year in addMapC) {
    const points = addMapC[year];
    if (i === 0) {
      firstYear = parseInt(year);
      result[year] = points;
      i++;
      continue;
    }

    result[year] = addMapC[year];
    let length = parseInt(year) - firstYear;
    let y = 1;
    while (y <= length) {
      const curMap = addMapC[year - y];
      for (const x in curMap) {
        let foundIndex = 0;
        const cur = curMap[x];
        let res = result[year].find((point, i) => {
          if (Math.abs(point.long - (cur.long) > 0.4) || Math.abs(point.lat - (cur.lat) > 0.33))
            return false;

          foundIndex = i;
          return true;
        });


        if (res !== undefined) {
          result[year][foundIndex].count += cur.count;
          result[year][foundIndex].long = (result[year][foundIndex].long + cur.long) / 2;
          result[year][foundIndex].lat = (result[year][foundIndex].lat + cur.lat) / 2;
        } else {
          result[year].push(cur);
        }
      }
      y++;
    }
    i++;
  }

  return result;
}

function toSimpleFormat(map) {
  let result = {};
  for (const year in map) {
    const points = map[year];
    result[year] = {
      lon: [],
      lat: [],
      counts: [],
    };
    let count = 0;
    for (const point of points) {
      result[year].lon.push(point.long)
      result[year].lat.push(point.lat)
      result[year].counts.push(point.count)
    }
  }
  return result;
}
