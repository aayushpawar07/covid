# Postman Test Guide for COVID API

## Backend Test Endpoints

### 1. Test if Backend is Running
**GET** `httpop://localhost:8081/api/test`
- Should return: "Backend is running! CORS is working!"

### 2. Test PUT Request
**PUT** `http://localhost:8081/api/test/123`
- Should return: "PUT request successful for: 123"

### 3. Test DELETE Request
**DELETE** `http://localhost:8081/api/test/123`
- Should return: "DELETE request successful for: 123"

### 4. Test OPTIONS (Preflight)
**OPTIONS** `http://localhost:8081/api/test`
- Should return 200 OK with CORS headers

---

## Country API Tests

### Get All Countries
**GET** `http://localhost:8081/api/country/all`
- Should return list of countries

### Get Single Country
**GET** `http://localhost:8081/api/country/Afghanistan`
- Should return Afghanistan data

### Update Country (PUT)
**PUT** `http://localhost:8081/api/country/Afghanistan`
**Headers:**
```
Content-Type: application/json
```
**Body (raw JSON):**
```json
{
  "country": "Afghanistan",
  "confirmed": 1000,
  "deaths": 50,
  "recovered": 800,
  "active": 150
}
```

### Delete Country (DELETE)
**DELETE** `http://localhost:8081/api/country/Afghanistan`
- Should return 200 OK

### Test OPTIONS Preflight
**OPTIONS** `http://localhost:8081/api/country/Afghanistan`
- Should return 200 OK with CORS headers:
  - `Access-Control-Allow-Origin: *`
  - `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH`
  - `Access-Control-Allow-Headers: *`

---

## Worldometer API Tests

### Get All Worldometer Data
**GET** `http://localhost:8081/api/worldometer/all`

### Update Worldometer (PUT)
**PUT** `http://localhost:8081/api/worldometer/1`
**Body (raw JSON):**
```json
{
  "countryRegion": "USA",
  "totalCases": 1000000,
  "totalDeaths": 50000,
  "totalRecovered": 800000
}
```

### Delete Worldometer (DELETE)
**DELETE** `http://localhost:8081/api/worldometer/1`

---

## Important Notes

1. **Backend must be running** on port 8081
2. **Check CORS headers** in Postman response:
   - Go to Headers tab
   - Look for `Access-Control-Allow-Origin`
3. **If OPTIONS fails**, the CORS filter might not be working
4. **If backend not responding**, check:
   - Is Spring Boot running?
   - Is MySQL database connected?
   - Check console for errors

---

## Troubleshooting

### CORS Error in Browser but Works in Postman
- This is normal! Postman doesn't enforce CORS
- The issue is with browser CORS policy
- Check that OPTIONS request returns proper headers

### Backend Not Starting
- Check MySQL is running
- Check database `covid` exists
- Check application.properties has correct DB credentials

### 404 Not Found
- Make sure endpoint URL is correct
- Check @RequestMapping path in controller
- Verify server is running on port 8081

