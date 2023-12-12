# Funktionen im Node-Script:

- `function getMaxMeasurement(sensortype)`, am besten mit optionalem Parameter, wie weit in die Vergangenheit gesucht wird.
- `function getMinMeasurement(sensortype)`, dito.
- `function getLastMeasurements(espId, sensortype, count = 1)`, wenn count `null` ist, sollen alle verfügbaren Measurements gesendet werden.
- `function getMeasurementCount(espId, sensorType, startDate, endDate)`, die Daten sind optional.
- Weitere, eigene Abfragen, die interessant oder nützlich sein könnten
