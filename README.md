
# Testing Hapi/Lab/Istanbul

```
git clone git@github.com:atomantic/lab_istanbul.git
cd lab_istanbul
npm install
gulp test
```

report should show that index.js is 100% covered, but it's showing 0%.

```
-----------------|-----------|-----------|-----------|-----------|
File             |   % Stmts |% Branches |   % Funcs |   % Lines |
-----------------|-----------|-----------|-----------|-----------|
   lab_istanbul/ |         0 |         0 |         0 |         0 |
      index.js   |         0 |         0 |         0 |         0 |
-----------------|-----------|-----------|-----------|-----------|
All files        |         0 |         0 |         0 |         0 |
-----------------|-----------|-----------|-----------|-----------|


=============================== Coverage summary ===============================
Statements   : 0% ( 0/8 )
Branches     : 0% ( 0/2 )
Functions    : 0% ( 0/2 )
Lines        : 0% ( 0/8 )
================================================================================
```