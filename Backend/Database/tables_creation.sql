-- SQLite
------STATIONS TABLE------
PRAGMA foreign_keys = 0;

CREATE TABLE sqlitestudio_temp_table AS SELECT *
                                          FROM stations;

DROP TABLE stations;

CREATE TABLE stations (
    station_id   NUMERIC (8)    NOT NULL,
    station_name TEXT (30)      NOT NULL
                                PRIMARY KEY,
    state        TEXT (3)       NOT NULL,
    dist         NUMERIC (3)    NOT NULL,
    lat          NUMERIC (8, 3) NOT NULL,
    lon          NUMERIC (8, 3) NOT NULL
)
WITHOUT ROWID;

INSERT INTO stations (
                         station_id,
                         station_name,
                         state,
                         dist,
                         lat,
                         lon
                     )
                     SELECT station_id,
                            station_name,
                            state,
                            dist,
                            lat,
                            lon
                       FROM sqlitestudio_temp_table;

DROP TABLE sqlitestudio_temp_table;

PRAGMA foreign_keys = 1;




----DATES TABLE-----
PRAGMA foreign_keys = 0;

CREATE TABLE sqlitestudio_temp_table AS SELECT *
                                          FROM Dates;

DROP TABLE Dates;

CREATE TABLE Dates (
    Date  DATE        NOT NULL
                      PRIMARY KEY,
    Month TEXT (3)    NOT NULL,
    Year  NUMERIC (4) NOT NULL,
    Quarter NUMERIC(1) NOT NULL
);

INSERT INTO Dates (
                      Date,
                      Month,
                      Year
                  )
                  SELECT Date,
                         Month,
                         Year
                    FROM sqlitestudio_temp_table;

DROP TABLE sqlitestudio_temp_table;

PRAGMA foreign_keys = 1;



-----STATION_DATA TABLE-----
PRAGMA foreign_keys = 0;

CREATE TABLE sqlitestudio_temp_table AS SELECT *
                                          FROM weather_data;

DROP TABLE weather_data;

CREATE TABLE weather_data (
    station_name          TEXT (30) REFERENCES stations (station_name) ON DELETE CASCADE
                                                                       ON UPDATE CASCADE
                                    NOT NULL,
    Date                  DATE      REFERENCES Dates (Date) ON DELETE CASCADE
                                                            ON UPDATE CASCADE
                                    NOT NULL,
    Rain                  NUMERIC   ,
    Max_temp              NUMERIC   ,
    Min_temp              NUMERIC   ,
    Max_relative_humidity NUMERIC   ,
    Min_relative_humidity NUMERIC   ,
    Avg_10m_windspeed     NUMERIC   ,

    PRIMARY KEY (station_name, Date)
);

INSERT INTO weather_data (
                             station_name,
                             Date,
                             Rain,
                             Max_temp,
                             Min_temp,
                             Max_relative_humidity,
                             Min_relative_humidity,
                             Avg_10m_windspeed
                         )
                         SELECT station_name,
                                Date,
                                Rain,
                                Max_temp,
                                Min_temp,
                                Max_relative_humidity,
                                Min_relative_humidity,
                                Avg_10m_windspeed
                           FROM sqlitestudio_temp_table;

DROP TABLE sqlitestudio_temp_table;

PRAGMA foreign_keys = 1;

DROP TABLE sqlitestudio_temp_table


