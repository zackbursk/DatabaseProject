var http = require('http');
const express = require('express');
const oracledb = require('oracledb');
require('dotenv').config();
const cors = require('cors');

const app = express()
app.use(cors());
console.log(`C:/Users/Zack/oracle/instantclient_21_3`);
const orclInfo = {
  connectionConfig : {
      user          : "zackbursk",
      password      : "m1uIvF2njU31cF5mKxciQBti",
      connectString : "oracle.cise.ufl.edu/orcl",
  },
  
  networkDirectory : `${process.env.HOME}/oracle/instantclient_21_3`
}


try {
  oracledb.initOracleClient({libDir: 'C:\\orcale\\instantclient_21_3'});
} catch (err) {
  console.error('Whoops!');
  console.error(err);
  process.exit(1);
}

async function trend1(req, res) {
  try {
    connection = await oracledb.getConnection({
        user: "zackbursk",
        password: "m1uIvF2njU31cF5mKxciQBti",
        connectString: "oracle.cise.ufl.edu/orcl"
    });
  
      console.log('connected to database');
      const year = req.params.year;
      result = await connection.execute(
        `WITH JAN AS (
          SELECT AVG(DELAY1)
          FROM
          (
          SELECT DELAY_TIME as "DELAY1"
          FROM szczesniakd.AIRPORTS
                JOIN szczesniakd.ROUTES
                ON szczesniakd.AIRPORTS.IATA = szczesniakd.ROUTES.SOURCE_AIRPORT
                WHERE (DELAY_TIME>0) AND (FLIGHT_DAY BETWEEN '6-JAN-${year}' AND '27-FEB-${year}')
                )),   
          FEB AS (
          SELECT AVG(DELAY2)
          FROM
          (
          SELECT AVG(DELAY_TIME) as "DELAY2"
          FROM szczesniakd.AIRPORTS
                JOIN szczesniakd.ROUTES
                ON szczesniakd.AIRPORTS.IATA = szczesniakd.ROUTES.SOURCE_AIRPORT
                WHERE (DELAY_TIME>0) AND (FLIGHT_DAY BETWEEN '28-FEB-${year}' AND '30-MAY-${year}')
                ORDER BY DELAY_TIME ASC
                )),   
          MAR AS (
          SELECT AVG(DELAY3)
          FROM
          (
          SELECT AVG(DELAY_TIME) as "DELAY3"
          FROM szczesniakd.AIRPORTS
                JOIN szczesniakd.ROUTES
                ON szczesniakd.AIRPORTS.IATA = szczesniakd.ROUTES.SOURCE_AIRPORT
                WHERE (DELAY_TIME>0) AND (FLIGHT_DAY BETWEEN '30-MAY-${year}' AND '30-AUG-${year}')
                ORDER BY DELAY_TIME ASC
                )),   
          APR AS (
          SELECT AVG(DELAY)
          FROM
          (
          SELECT AVG(DELAY_TIME) as "DELAY"
          FROM szczesniakd.AIRPORTS
                JOIN szczesniakd.ROUTES
                ON szczesniakd.AIRPORTS.IATA = szczesniakd.ROUTES.SOURCE_AIRPORT
                WHERE (DELAY_TIME>0) AND (FLIGHT_DAY BETWEEN '30-AUG-${year}' AND '30-NOV-${year}')
                ORDER BY DELAY_TIME ASC
                ))
                SELECT * FROM JAN,FEB,MAR,APR
                `
      );
    } catch (err) {
      return res.send(err.message);
    } finally {
      if (connection) {
        try {
          await connection.close();
          console.log('close connection success');
        } catch (err) {
          console.error(err.message);
        }
      }
      if (result.rows.length == 0) {
        return res.send('Query sent no rows!');
      } else {
        return res.send(result.rows);
      }
  
    }
  }

app.get('/api/trend1/:year', (req, res) => {
    console.log('attempting connection');
    trend1(req, res);
});

async function trend2(req, res) {
  try {
    connection = await oracledb.getConnection({
        user: "zackbursk",
        password: "m1uIvF2njU31cF5mKxciQBti",
        connectString: "oracle.cise.ufl.edu/orcl"
    });

    console.log('connected to database');
    const airportName = req.params.airportName;
    const year = req.params.year;
    result = await connection.execute(
      `WITH JAN AS (
        SELECT AVG(DELAY1)
        FROM
        (
        SELECT DELAY_TIME as "DELAY1"
        FROM szczesniakd.AIRPORTS
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPORTS.IATA = szczesniakd.ROUTES.SOURCE_AIRPORT
              WHERE (AIRPORTNAME = '${airportName}') AND (FLIGHT_DAY BETWEEN '1-JAN-${year}' AND '27-JAN-${year}')
              )),   
        FEB AS (
        SELECT AVG(DELAY2)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY2"
        FROM szczesniakd.AIRPORTS
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPORTS.IATA = szczesniakd.ROUTES.SOURCE_AIRPORT
              WHERE (AIRPORTNAME = '${airportName}') AND (FLIGHT_DAY BETWEEN '1-FEB-${year}' AND '27-FEB-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        MAR AS (
        SELECT AVG(DELAY3)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY3"
        FROM szczesniakd.AIRPORTS
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPORTS.IATA = szczesniakd.ROUTES.SOURCE_AIRPORT
              WHERE (AIRPORTNAME = '${airportName}') AND (FLIGHT_DAY BETWEEN '1-MAR-${year}' AND '30-MAR-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        APR AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRPORTS
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPORTS.IATA = szczesniakd.ROUTES.SOURCE_AIRPORT
              WHERE (AIRPORTNAME = '${airportName}') AND (FLIGHT_DAY BETWEEN '1-APR-${year}' AND '30-APR-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        MAY AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRPORTS
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPORTS.IATA = szczesniakd.ROUTES.SOURCE_AIRPORT
              WHERE (AIRPORTNAME = '${airportName}') AND (FLIGHT_DAY BETWEEN '1-MAY-${year}' AND '30-MAY-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        JUN AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRPORTS
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPORTS.IATA = szczesniakd.ROUTES.SOURCE_AIRPORT
              WHERE (AIRPORTNAME = '${airportName}') AND (FLIGHT_DAY BETWEEN '1-JUN-${year}' AND '30-JUN-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        JUL AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRPORTS
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPORTS.IATA = szczesniakd.ROUTES.SOURCE_AIRPORT
              WHERE (AIRPORTNAME = '${airportName}') AND (FLIGHT_DAY BETWEEN '1-JUL-${year}' AND '30-JUL-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        AUG AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRPORTS
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPORTS.IATA = szczesniakd.ROUTES.SOURCE_AIRPORT
              WHERE (AIRPORTNAME = '${airportName}') AND (FLIGHT_DAY BETWEEN '1-AUG-${year}' AND '30-AUG-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        SEP AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRPORTS
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPORTS.IATA = szczesniakd.ROUTES.SOURCE_AIRPORT
              WHERE (AIRPORTNAME = '${airportName}') AND (FLIGHT_DAY BETWEEN '1-SEP-${year}' AND '29-SEP-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        OCT AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRPORTS
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPORTS.IATA = szczesniakd.ROUTES.SOURCE_AIRPORT
              WHERE (AIRPORTNAME = '${airportName}') AND (FLIGHT_DAY BETWEEN '1-OCT-${year}' AND '30-OCT-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        NOV AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRPORTS
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPORTS.IATA = szczesniakd.ROUTES.SOURCE_AIRPORT
              WHERE (AIRPORTNAME = '${airportName}') AND (FLIGHT_DAY BETWEEN '1-NOV-${year}' AND '30-NOV-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        DEC AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRPORTS
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPORTS.IATA = szczesniakd.ROUTES.SOURCE_AIRPORT
              WHERE (AIRPORTNAME = '${airportName}') AND (FLIGHT_DAY BETWEEN '1-DEC-${year}' AND '30-DEC-${year}')
              ORDER BY DELAY_TIME ASC
              ))
              SELECT * FROM JAN,FEB,MAR,APR,MAY,JUN,JUL,AUG,SEP,OCT,NOV,DEC
    `
    );
  } catch (err) {
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      return res.send('Query sent no rows!');
    } else {
      return res.send(result.rows);
    }

  }
}

app.get('/api/trend2/:airportName/:year', (req, res) => {
  console.log('attempting connection');
  trend2(req, res);
});

async function trend3(req, res) {
  try {
    connection = await oracledb.getConnection({
        user: "zackbursk",
        password: "m1uIvF2njU31cF5mKxciQBti",
        connectString: "oracle.cise.ufl.edu/orcl"
    });

    console.log('connected to database');
    const airplaneName = req.params.airplaneName;
    console.log(airplaneName);
    const year = req.params.year;
    console.log(year);
    result = await connection.execute(
      `
      WITH JAN AS (
        SELECT AVG(DELAY1)
        FROM
        (
        SELECT DELAY_TIME as "DELAY1"
        FROM szczesniakd.AIRPLANES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPLANES.IATA_CODE = szczesniakd.ROUTES.EQUIPMENT
              WHERE (AIRPLANENAME = '${airplaneName}') AND (FLIGHT_DAY BETWEEN '1-JAN-${year}' AND '27-JAN-${year}')
              )),   
        FEB AS (
        SELECT AVG(DELAY2)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY2"
        FROM szczesniakd.AIRPLANES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPLANES.IATA_CODE = szczesniakd.ROUTES.EQUIPMENT
              WHERE (AIRPLANENAME = '${airplaneName}') AND (FLIGHT_DAY BETWEEN '1-FEB-${year}' AND '27-FEB-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        MAR AS (
        SELECT AVG(DELAY3)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY3"
        FROM szczesniakd.AIRPLANES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPLANES.IATA_CODE = szczesniakd.ROUTES.EQUIPMENT
              WHERE (AIRPLANENAME = '${airplaneName}') AND (FLIGHT_DAY BETWEEN '1-MAR-${year}' AND '30-MAR-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        APR AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRPLANES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPLANES.IATA_CODE = szczesniakd.ROUTES.EQUIPMENT
              WHERE (AIRPLANENAME = '${airplaneName}') AND (FLIGHT_DAY BETWEEN '1-APR-${year}' AND '30-APR-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        MAY AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRPLANES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPLANES.IATA_CODE = szczesniakd.ROUTES.EQUIPMENT
              WHERE (AIRPLANENAME = '${airplaneName}') AND (FLIGHT_DAY BETWEEN '1-MAY-${year}' AND '30-MAY-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        JUN AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRPLANES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPLANES.IATA_CODE = szczesniakd.ROUTES.EQUIPMENT
              WHERE (AIRPLANENAME = '${airplaneName}') AND (FLIGHT_DAY BETWEEN '1-JUN-${year}' AND '30-JUN-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        JUL AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRPLANES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPLANES.IATA_CODE = szczesniakd.ROUTES.EQUIPMENT
              WHERE (AIRPLANENAME = '${airplaneName}') AND (FLIGHT_DAY BETWEEN '1-JUL-${year}' AND '30-JUL-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        AUG AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRPLANES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPLANES.IATA_CODE = szczesniakd.ROUTES.EQUIPMENT
              WHERE (AIRPLANENAME = '${airplaneName}') AND (FLIGHT_DAY BETWEEN '1-AUG-${year}' AND '30-AUG-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        SEP AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRPLANES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPLANES.IATA_CODE = szczesniakd.ROUTES.EQUIPMENT
              WHERE (AIRPLANENAME = '${airplaneName}') AND (FLIGHT_DAY BETWEEN '1-SEP-${year}' AND '30-SEP-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        OCT AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRPLANES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPLANES.IATA_CODE = szczesniakd.ROUTES.EQUIPMENT
              WHERE (AIRPLANENAME = '${airplaneName}') AND (FLIGHT_DAY BETWEEN '1-OCT-${year}' AND '31-OCT-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        NOV AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRPLANES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPLANES.IATA_CODE = szczesniakd.ROUTES.EQUIPMENT
              WHERE (AIRPLANENAME = '${airplaneName}') AND (FLIGHT_DAY BETWEEN '1-NOV-${year}' AND '30-NOV-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        DEC AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRPLANES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPLANES.IATA_CODE = szczesniakd.ROUTES.EQUIPMENT
              WHERE (AIRPLANENAME = '${airplaneName}') AND (FLIGHT_DAY BETWEEN '1-DEC-${year}' AND '31-DEC-${year}')
              ORDER BY DELAY_TIME ASC
              ))
              SELECT * FROM JAN,FEB,MAR,APR,MAY,JUN,JUL,AUG,SEP,OCT,NOV,DEC
      `
    );
    console.log(result);
  } catch (err) {
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    console.log(result);
    if (result.rows.length == 0) {
      return res.send('Query sent no rows!');
    } else {
      return res.send(result.rows);
    }

  }
}

app.get('/api/trend3/:airplaneName/:year', (req, res) => {
  console.log('attempting connection');
  trend3(req, res);
});

async function trend4(req, res) {
  try {
    connection = await oracledb.getConnection({
        user: "zackbursk",
        password: "m1uIvF2njU31cF5mKxciQBti",
        connectString: "oracle.cise.ufl.edu/orcl"
    });

    console.log('connected to database');
    const cityCode = req.params.cityCode;
    const year = req.params.year;
    result = await connection.execute(
      `WITH JAN AS (
        SELECT AVG(DELAY1)
        FROM
        (
        SELECT DELAY_TIME as "DELAY1"
        FROM szczesniakd.DEPARTURES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.DEPARTURES.CARRIER = szczesniakd.ROUTES.AIRLINE
              WHERE (US_GATEWAY_AIRPORTCODE = '${cityCode}') AND (FLIGHT_DAY BETWEEN '1-JAN-${year}' AND '27-JAN-${year}')
              )),   
        FEB AS (
        SELECT AVG(DELAY2)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY2"
        FROM szczesniakd.DEPARTURES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.DEPARTURES.CARRIER = szczesniakd.ROUTES.AIRLINE
              WHERE (US_GATEWAY_AIRPORTCODE = '${cityCode}') AND (FLIGHT_DAY BETWEEN '1-FEB-${year}' AND '27-FEB-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        MAR AS (
        SELECT AVG(DELAY3)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY3"
        FROM szczesniakd.DEPARTURES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.DEPARTURES.CARRIER = szczesniakd.ROUTES.AIRLINE
              WHERE (US_GATEWAY_AIRPORTCODE = '${cityCode}') AND (FLIGHT_DAY BETWEEN '1-MAR-${year}' AND '30-MAR-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        APR AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.DEPARTURES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.DEPARTURES.CARRIER = szczesniakd.ROUTES.AIRLINE
              WHERE (US_GATEWAY_AIRPORTCODE = '${cityCode}') AND (FLIGHT_DAY BETWEEN '1-APR-${year}' AND '30-APR-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        MAY AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.DEPARTURES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.DEPARTURES.CARRIER = szczesniakd.ROUTES.AIRLINE
              WHERE (US_GATEWAY_AIRPORTCODE = '${cityCode}') AND (FLIGHT_DAY BETWEEN '1-MAY-${year}' AND '30-MAY-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        JUN AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.DEPARTURES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.DEPARTURES.CARRIER = szczesniakd.ROUTES.AIRLINE
              WHERE (US_GATEWAY_AIRPORTCODE = '${cityCode}') AND (FLIGHT_DAY BETWEEN '1-JUN-${year}' AND '30-JUN-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        JUL AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.DEPARTURES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.DEPARTURES.CARRIER = szczesniakd.ROUTES.AIRLINE
              WHERE (US_GATEWAY_AIRPORTCODE = '${cityCode}') AND (FLIGHT_DAY BETWEEN '1-JUL-${year}' AND '30-JUL-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        AUG AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.DEPARTURES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.DEPARTURES.CARRIER = szczesniakd.ROUTES.AIRLINE
              WHERE (US_GATEWAY_AIRPORTCODE = '${cityCode}') AND (FLIGHT_DAY BETWEEN '1-AUG-${year}' AND '30-AUG-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        SEP AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.DEPARTURES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.DEPARTURES.CARRIER = szczesniakd.ROUTES.AIRLINE
              WHERE (US_GATEWAY_AIRPORTCODE = '${cityCode}') AND (FLIGHT_DAY BETWEEN '1-SEP-${year}' AND '29-SEP-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        OCT AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.DEPARTURES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.DEPARTURES.CARRIER = szczesniakd.ROUTES.AIRLINE
              WHERE (US_GATEWAY_AIRPORTCODE = '${cityCode}') AND (FLIGHT_DAY BETWEEN '1-OCT-${year}' AND '30-OCT-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        NOV AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.DEPARTURES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.DEPARTURES.CARRIER = szczesniakd.ROUTES.AIRLINE
              WHERE (US_GATEWAY_AIRPORTCODE = '${cityCode}') AND (FLIGHT_DAY BETWEEN '1-NOV-${year}' AND '30-NOV-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        DEC AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.DEPARTURES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.DEPARTURES.CARRIER = szczesniakd.ROUTES.AIRLINE
              WHERE (US_GATEWAY_AIRPORTCODE = '${cityCode}') AND (FLIGHT_DAY BETWEEN '1-DEC-${year}' AND '30-DEC-${year}')
              ORDER BY DELAY_TIME ASC
              ))
              SELECT * FROM JAN,FEB,MAR,APR,MAY,JUN,JUL,AUG,SEP,OCT,NOV,DEC
      `
    );
  } catch (err) {
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      return res.send('Query sent no rows!');
    } else {
      return res.send(result.rows);
    }

  }
}

app.get('/api/trend4/:cityCode/:year', (req, res) => {
  console.log('attempting connection');
  trend4(req, res);
});

async function trend5(req, res) {
  try {
    connection = await oracledb.getConnection({
        user: "zackbursk",
        password: "m1uIvF2njU31cF5mKxciQBti",
        connectString: "oracle.cise.ufl.edu/orcl"
    });

    console.log('connected to database');
    const airlineName = req.params.airlineName;
    const year = req.params.year;
    result = await connection.execute(
      `WITH JAN AS (
        SELECT AVG(DELAY1)
        FROM
        (
        SELECT DELAY_TIME as "DELAY1"
        FROM szczesniakd.AIRLINES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRLINES.IATA = szczesniakd.ROUTES.AIRLINE
              WHERE (AIRLINENAME = '${airlineName}') AND (FLIGHT_DAY BETWEEN '1-JAN-${year}' AND '27-JAN-${year}')
              )),   
        FEB AS (
        SELECT AVG(DELAY2)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY2"
        FROM szczesniakd.AIRLINES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRLINES.IATA = szczesniakd.ROUTES.AIRLINE
              WHERE (AIRLINENAME = '${airlineName}') AND (FLIGHT_DAY BETWEEN '1-FEB-${year}' AND '27-FEB-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        MAR AS (
        SELECT AVG(DELAY3)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY3"
        FROM szczesniakd.AIRLINES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRLINES.IATA = szczesniakd.ROUTES.AIRLINE
              WHERE (AIRLINENAME = '${airlineName}') AND (FLIGHT_DAY BETWEEN '1-MAR-${year}' AND '30-MAR-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        APR AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRLINES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRLINES.IATA = szczesniakd.ROUTES.AIRLINE
              WHERE (AIRLINENAME = '${airlineName}') AND (FLIGHT_DAY BETWEEN '1-APR-${year}' AND '30-APR-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        MAY AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRLINES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRLINES.IATA = szczesniakd.ROUTES.AIRLINE
              WHERE (AIRLINENAME = '${airlineName}') AND (FLIGHT_DAY BETWEEN '1-MAY-${year}' AND '30-MAY-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        JUN AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRLINES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRLINES.IATA = szczesniakd.ROUTES.AIRLINE
              WHERE (AIRLINENAME = '${airlineName}') AND (FLIGHT_DAY BETWEEN '1-JUN-${year}' AND '30-JUN-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        JUL AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRLINES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRLINES.IATA = szczesniakd.ROUTES.AIRLINE
              WHERE (AIRLINENAME = '${airlineName}') AND (FLIGHT_DAY BETWEEN '1-JUL-${year}' AND '30-JUL-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        AUG AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRLINES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRLINES.IATA = szczesniakd.ROUTES.AIRLINE
              WHERE (AIRLINENAME = '${airlineName}') AND (FLIGHT_DAY BETWEEN '1-AUG-${year}' AND '30-AUG-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        SEP AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRLINES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRLINES.IATA = szczesniakd.ROUTES.AIRLINE
              WHERE (AIRLINENAME = '${airlineName}') AND (FLIGHT_DAY BETWEEN '1-SEP-${year}' AND '29-SEP-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        OCT AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRLINES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRLINES.IATA = szczesniakd.ROUTES.AIRLINE
              WHERE (AIRLINENAME = '${airlineName}') AND (FLIGHT_DAY BETWEEN '1-OCT-${year}' AND '30-OCT-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        NOV AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRLINES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRLINES.IATA = szczesniakd.ROUTES.AIRLINE
              WHERE (AIRLINENAME = '${airlineName}') AND (FLIGHT_DAY BETWEEN '1-NOV-${year}' AND '30-NOV-${year}')
              ORDER BY DELAY_TIME ASC
              )),   
        DEC AS (
        SELECT AVG(DELAY)
        FROM
        (
        SELECT AVG(DELAY_TIME) as "DELAY"
        FROM szczesniakd.AIRLINES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRLINES.IATA = szczesniakd.ROUTES.AIRLINE
              WHERE (AIRLINENAME = '${airlineName}') AND (FLIGHT_DAY BETWEEN '1-DEC-${year}' AND '30-DEC-${year}')
              ORDER BY DELAY_TIME ASC
              ))
              SELECT * FROM JAN,FEB,MAR,APR,MAY,JUN,JUL,AUG,SEP,OCT,NOV,DEC
      `
    );
  } catch (err) {
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      return res.send('Query sent no rows!');
    } else {
      return res.send(result.rows);
    }

  }
}

app.get('/api/trend5/:airlineName/:year', (req, res) => {
  console.log('attempting connection');
  trend5(req, res);
});

async function trend6(req, res) {
  try {
    connection = await oracledb.getConnection({
        user: "zackbursk",
        password: "m1uIvF2njU31cF5mKxciQBti",
        connectString: "oracle.cise.ufl.edu/orcl"
    });

    console.log('connected to database');
    const airlineName = req.params.airlineName;
    const year = req.params.year;
    result = await connection.execute(
      `WITH JAN AS (
        SELECT AVG(DELAY1)
        FROM
        (
        SELECT DELAY_TIME as "DELAY1"
        FROM szczesniakd.AIRLINES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRLINES.IATA = szczesniakd.ROUTES.AIRLINE
              WHERE (AIRLINENAME = '${airlineName}') AND (FLIGHT_DAY BETWEEN '1-JAN-2010' AND '30-DEC-2010')
              )),   
        FEB AS (
        SELECT AVG(DELAY1)
        FROM
        (
          SELECT DELAY_TIME as "DELAY1"
          FROM szczesniakd.AIRLINES
                JOIN szczesniakd.ROUTES
                ON szczesniakd.AIRLINES.IATA = szczesniakd.ROUTES.AIRLINE
                WHERE (AIRLINENAME = '${airlineName}') AND (FLIGHT_DAY BETWEEN '1-JAN-2011' AND '30-DEC-2011')
                )),  
        MAR AS (
        SELECT AVG(DELAY1)
        FROM
        (
          SELECT DELAY_TIME as "DELAY1"
          FROM szczesniakd.AIRLINES
                JOIN szczesniakd.ROUTES
                ON szczesniakd.AIRLINES.IATA = szczesniakd.ROUTES.AIRLINE
                WHERE (AIRLINENAME = '${airlineName}') AND (FLIGHT_DAY BETWEEN '1-JAN-2012' AND '30-DEC-2012')
                )), 
        APR AS (
        SELECT AVG(DELAY1)
        FROM
        (
          SELECT DELAY_TIME as "DELAY1"
          FROM szczesniakd.AIRLINES
                JOIN szczesniakd.ROUTES
                ON szczesniakd.AIRLINES.IATA = szczesniakd.ROUTES.AIRLINE
                WHERE (AIRLINENAME = '${airlineName}') AND (FLIGHT_DAY BETWEEN '1-JAN-2013' AND '30-DEC-2013')
                )),   
        MAY AS (
        SELECT AVG(DELAY1)
        FROM
        (
          SELECT DELAY_TIME as "DELAY1"
          FROM szczesniakd.AIRLINES
                JOIN szczesniakd.ROUTES
                ON szczesniakd.AIRLINES.IATA = szczesniakd.ROUTES.AIRLINE
                WHERE (AIRLINENAME = '${airlineName}') AND (FLIGHT_DAY BETWEEN '1-JAN-2014' AND '30-DEC-2014')
                ))
              SELECT * FROM JAN,FEB,MAR,APR,MAY
      `
    );
  } catch (err) {
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      return res.send('Query sent no rows!');
    } else {
      return res.send(result.rows);
    }

  }
}

app.get('/api/trend6/:airlineName', (req, res) => {
  console.log('attempting connection');
  trend6(req, res);
});

async function trend7(req, res) {
  try {
    connection = await oracledb.getConnection({
        user: "zackbursk",
        password: "m1uIvF2njU31cF5mKxciQBti",
        connectString: "oracle.cise.ufl.edu/orcl"
    });

    console.log('connected to database');
    const airportName = req.params.airportName;
    const year = req.params.year;
    result = await connection.execute(
      `WITH JAN AS (
        SELECT AVG(DELAY1)
        FROM
        (
        SELECT DELAY_TIME as "DELAY1"
        FROM szczesniakd.AIRPORTS
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPORTS.IATA = szczesniakd.ROUTES.SOURCE_AIRPORT
              WHERE (AIRPORTNAME = '${airportName}') AND (FLIGHT_DAY BETWEEN '1-JAN-2010' AND '30-DEC-2010')
              )),   
        FEB AS (
        SELECT AVG(DELAY1)
        FROM
        (
          SELECT DELAY_TIME as "DELAY1"
          FROM szczesniakd.AIRPORTS
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPORTS.IATA = szczesniakd.ROUTES.SOURCE_AIRPORT
              WHERE (AIRPORTNAME = '${airportName}') AND (FLIGHT_DAY BETWEEN '1-JAN-2011' AND '30-DEC-2011')
                )),  
        MAR AS (
        SELECT AVG(DELAY1)
        FROM
        (
          SELECT DELAY_TIME as "DELAY1"
          FROM szczesniakd.AIRPORTS
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPORTS.IATA = szczesniakd.ROUTES.SOURCE_AIRPORT
              WHERE (AIRPORTNAME = '${airportName}') AND (FLIGHT_DAY BETWEEN '1-JAN-2012' AND '30-DEC-2012')
                )), 
        APR AS (
        SELECT AVG(DELAY1)
        FROM
        (
          SELECT DELAY_TIME as "DELAY1"
          FROM szczesniakd.AIRPORTS
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPORTS.IATA = szczesniakd.ROUTES.SOURCE_AIRPORT
              WHERE (AIRPORTNAME = '${airportName}') AND (FLIGHT_DAY BETWEEN '1-JAN-2013' AND '30-DEC-2013')
                )),   
        MAY AS (
        SELECT AVG(DELAY1)
        FROM
        (
          SELECT DELAY_TIME as "DELAY1"
          FROM szczesniakd.AIRPORTS
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPORTS.IATA = szczesniakd.ROUTES.SOURCE_AIRPORT
              WHERE (AIRPORTNAME = '${airportName}') AND (FLIGHT_DAY BETWEEN '1-JAN-2014' AND '30-DEC-2014')
                ))
              SELECT * FROM JAN,FEB,MAR,APR,MAY
      `
    );
  } catch (err) {
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      return res.send('Query sent no rows!');
    } else {
      return res.send(result.rows);
    }

  }
}

app.get('/api/trend7/:airportName', (req, res) => {
  console.log('attempting connection');
  trend7(req, res);
});

async function trend8(req, res) {
  try {
    connection = await oracledb.getConnection({
        user: "zackbursk",
        password: "m1uIvF2njU31cF5mKxciQBti",
        connectString: "oracle.cise.ufl.edu/orcl"
    });

    console.log('connected to database');
    const airplaneName = req.params.airplaneName;
    const year = req.params.year;
    result = await connection.execute(
      `WITH JAN AS (
        SELECT AVG(DELAY1)
        FROM
        (
        SELECT DELAY_TIME as "DELAY1"
        FROM szczesniakd.AIRPLANES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPLANES.IATA_CODE = szczesniakd.ROUTES.EQUIPMENT
              WHERE (AIRPLANENAME = '${airplaneName}') AND (FLIGHT_DAY BETWEEN '1-JAN-2010' AND '30-DEC-2010')
              )),   
        FEB AS (
          SELECT AVG(DELAY1)
          FROM
          (
          SELECT DELAY_TIME as "DELAY1"
          FROM szczesniakd.AIRPLANES
                JOIN szczesniakd.ROUTES
                ON szczesniakd.AIRPLANES.IATA_CODE = szczesniakd.ROUTES.EQUIPMENT
                WHERE (AIRPLANENAME = '${airplaneName}') AND (FLIGHT_DAY BETWEEN '1-JAN-2011' AND '30-DEC-2011')
                )),  
        MAR AS (
          SELECT AVG(DELAY1)
          FROM
          (
          SELECT DELAY_TIME as "DELAY1"
          FROM szczesniakd.AIRPLANES
                JOIN szczesniakd.ROUTES
                ON szczesniakd.AIRPLANES.IATA_CODE = szczesniakd.ROUTES.EQUIPMENT
                WHERE (AIRPLANENAME = '${airplaneName}') AND (FLIGHT_DAY BETWEEN '1-JAN-2012' AND '30-DEC-2012')
                )), 
        APR AS (
        SELECT AVG(DELAY1)
        FROM
        (
          SELECT DELAY_TIME as "DELAY1"
          FROM szczesniakd.AIRPLANES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPLANES.IATA_CODE = szczesniakd.ROUTES.EQUIPMENT
              WHERE (AIRPLANENAME = '${airplaneName}') AND (FLIGHT_DAY BETWEEN '1-JAN-2013' AND '30-DEC-2013')
                )),   
        MAY AS (
        SELECT AVG(DELAY1)
        FROM
        (
          SELECT DELAY_TIME as "DELAY1"
          FROM szczesniakd.AIRPLANES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.AIRPLANES.IATA_CODE = szczesniakd.ROUTES.EQUIPMENT
              WHERE (AIRPLANENAME = '${airplaneName}') AND (FLIGHT_DAY BETWEEN '1-JAN-2014' AND '30-DEC-2014')
                ))
              SELECT * FROM JAN,FEB,MAR,APR,MAY
      `
    );
  } catch (err) {
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      return res.send('Query sent no rows!');
    } else {
      return res.send(result.rows);
    }

  }
}

app.get('/api/trend8/:airplaneName', (req, res) => {
  console.log('attempting connection');
  trend8(req, res);
});

async function trend9(req, res) {
  try {
    connection = await oracledb.getConnection({
        user: "zackbursk",
        password: "m1uIvF2njU31cF5mKxciQBti",
        connectString: "oracle.cise.ufl.edu/orcl"
    });

    console.log('connected to database');
    const cityCode = req.params.cityCode;
    const year = req.params.year;
    result = await connection.execute(
      `WITH JAN AS (
        SELECT AVG(DELAY1)
        FROM
        (
        SELECT DELAY_TIME as "DELAY1"
        FROM szczesniakd.DEPARTURES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.DEPARTURES.CARRIER = szczesniakd.ROUTES.AIRLINE
              WHERE (US_GATEWAY_AIRPORTCODE = '${cityCode}') AND (FLIGHT_DAY BETWEEN '1-JAN-2010' AND '30-DEC-2010')
              )),   
        FEB AS (
        SELECT AVG(DELAY1)
        FROM
        (
          SELECT DELAY_TIME as "DELAY1"
          FROM szczesniakd.DEPARTURES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.DEPARTURES.CARRIER = szczesniakd.ROUTES.AIRLINE
              WHERE (US_GATEWAY_AIRPORTCODE = '${cityCode}') AND (FLIGHT_DAY BETWEEN '1-JAN-2011' AND '30-DEC-2011')
                )),  
        MAR AS (
        SELECT AVG(DELAY1)
        FROM
        (
          SELECT DELAY_TIME as "DELAY1"
          FROM szczesniakd.DEPARTURES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.DEPARTURES.CARRIER = szczesniakd.ROUTES.AIRLINE
              WHERE (US_GATEWAY_AIRPORTCODE = '${cityCode}') AND (FLIGHT_DAY BETWEEN '1-JAN-2012' AND '30-DEC-2012')
                )), 
        APR AS (
        SELECT AVG(DELAY1)
        FROM
        (
          SELECT DELAY_TIME as "DELAY1"
          FROM szczesniakd.DEPARTURES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.DEPARTURES.CARRIER = szczesniakd.ROUTES.AIRLINE
              WHERE (US_GATEWAY_AIRPORTCODE = '${cityCode}') AND (FLIGHT_DAY BETWEEN '1-JAN-2013' AND '30-DEC-2013')
                )),   
        MAY AS (
        SELECT AVG(DELAY1)
        FROM
        (
          SELECT DELAY_TIME as "DELAY1"
          FROM szczesniakd.DEPARTURES
              JOIN szczesniakd.ROUTES
              ON szczesniakd.DEPARTURES.CARRIER = szczesniakd.ROUTES.AIRLINE
              WHERE (US_GATEWAY_AIRPORTCODE = '${cityCode}') AND (FLIGHT_DAY BETWEEN '1-JAN-2014' AND '30-DEC-2014')
                ))
              SELECT * FROM JAN,FEB,MAR,APR,MAY
      `
    );
  } catch (err) {
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      return res.send('Query sent no rows!');
    } else {
      return res.send(result.rows);
    }

  }
}

app.get('/api/trend9/:cityCode', (req, res) => {
  console.log('attempting connection');
  trend9(req, res);
});

async function tuple(req, res) {
  console.log("here");
  try {
    connection = await oracledb.getConnection({
      user: "zackbursk",
      password: "m1uIvF2njU31cF5mKxciQBti",
      connectString: "oracle.cise.ufl.edu/orcl"
    });

    console.log('connected to database');

    result = await connection.execute(
      `WITH x1 AS (SELECT COUNT(*) AS totalT FROM szczesniakd.Airlines),
       x2 AS (SELECT COUNT(*) AS totalT FROM szczesniakd.Routes),
       x3 AS (SELECT COUNT(*) AS totalT FROM szczesniakd.Weather),
       x4 AS (SELECT COUNT(*) AS totalT FROM szczesniakd.Departures),
       x5 AS (SELECT COUNT(*) AS totalT FROM szczesniakd.Airplanes),
       x6 AS (SELECT COUNT(*) AS totalT FROM szczesniakd.Airports)
      SELECT (x1.totalT + x2.totalT +x3.totalT + x4.totalT + x5.totalT + x6.totalT) as totalTuple 
      FROM x1, x2, x3, x4, x5, x6`
    );
  } catch (err) {
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      return res.send('Query sent no rows!');
    } else {
      return res.send(result.rows);
    }

  }
}

app.get('/api/tuple', (req, res) => {
  console.log("here");
  console.log('attempting connection');
  tuple(req, res);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
