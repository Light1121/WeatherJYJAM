-----
PRAGMA foreign_keys = 0;

CREATE TABLE sqlitestudio_temp_table AS SELECT *
                                          FROM stations;

DROP TABLE stations;

CREATE TABLE stations (
    station_id   NUMERIC (8)    PRIMARY KEY
                                NOT NULL,
    station_name TEXT (30)      NOT NULL,
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
    Year  NUMERIC (4) NOT NULL
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
                                          FROM station_data;

DROP TABLE station_data;

CREATE TABLE station_data (
    Date                  DATE        CONSTRAINT date_station_data_fk REFERENCES Dates (Date) ON DELETE CASCADE
                                                                                              ON UPDATE CASCADE
                                      NOT NULL,
    station_id            NUMERIC (8) CONSTRAINT stations_station_data_fk REFERENCES stations (station_id) ON DELETE CASCADE
                                                                                                           ON UPDATE CASCADE
                                      NOT NULL,
    Rain                  NUMERIC     NOT NULL,
    Max_temp              NUMERIC     NOT NULL,
    Min_temp              NUMERIC     NOT NULL,
    Max_relative_humidity NUMERIC     NOT NULL,
    Min_relative_humidity NUMERIC     NOT NULL,
    Avg_10m_windspeed     NUMERIC     NOT NULL
);

INSERT INTO station_data (
                             Date,
                             station_id,
                             Rain,
                             Max_temp,
                             Min_temp,
                             Max_relative_humidity,
                             Min_relative_humidity,
                             Avg_10m_windspeed
                         )
                         SELECT Date,
                                station_id,
                                Rain,
                                Max_temp,
                                Min_temp,
                                Max_relative_humidity,
                                Min_relative_humidity,
                                Avg_10m_windspeed
                           FROM sqlitestudio_temp_table;

DROP TABLE sqlitestudio_temp_table;

PRAGMA foreign_keys = 1;
