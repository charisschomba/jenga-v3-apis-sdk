import { AccountService, JengaApiSdk } from "jenga-apis-sdk";
const config = {
  apiKey:
    "B/xDKDWPMX5acekuX5QZF/8JIozvr40Xd+2RABniIRfwsO7gs4UuhwPJxthWpi14Y3JfSi+8JlkRO9xuL6DuVg==",
  merchantCode: "4611458492",
  consumerSecret: "2KR0Mgj6Ri26X29hayKfClQ6c2Mt0V",
  privateKeyPath: "/home/chariss/dev/personal/javascript/JengaSdk/uat.pem",
  env: "UAT",
};

const accessToken =
  "eyJhbGciOiJSUzUxMiJ9.eyJ0b2tlblR5cGUiOiJNRVJDSEFOVCIsImVudiI6IlVBVCIsImV4cCI6MTY3OTQ3Nzg2NCwiaWF0IjoxNjc5NDc2OTY0LCJhY2NvdW50IjoiMjc3ODIwQUU4RkM2OTc0Q0MwNEM0NTFFMjFCMkJGQzVDNTc0NzFEMDYzRUI2OTI2MDg2NDA5QkY5MzRGQjcyOEE0QUZCQkM1ODdGODYxRDcwMzUyMENGREVEQTE5RjJGUDRHbWlOdmNlakJock9GcTl0ZHg3TkhhbUxpbzJjS0VoUkI5aHpScHNxL0MyelN3VUlEa3haUkJ4VVlNTm9uQzBVU3VWVmZCaFlLWkh0Y1FYYysyc3R4b250MjhhZ1BnNzBveDU1ZFZPaSsranoxemxvcDZYbzNuY3BIczFQL2pDRENFVG01WUs4V01iUXpWL01hbjg1YWNOcjhhZVFUcHJibWd1eEo4STlzVUlPMjF1YS9FazRnd0JEY1MzSjFsRXFxZEI4TlFqWExYZG5JU1VhOUNOT0JMN3VRN0ZweDV4bWI0UVJ0TUVLVTAycHpNV01nV0FLN0E3dXI2U3lLRkV1Y3RLNWQxTmN3aWRKQkJUaTVTTWhhUEY4OUIxZThiTkpqRFNjZGtESG11ZWpKMUJza2hNTkkxY1RZaTFPMFM1U3I4ZUpTclFidmVmekxRd3NxSXhVbEM2Y1VuWE9paVdCanIwN01Ocm9peWtFSDBQZmw3aUpuR09IWlh1M0JWSEkxWHRpWW50bDRHOGw4clVVUEwvSUl0QU9rRmNIa0JWNVZGeVo2Z2J0Zz0ifQ.LtQ9qlbVCSis5jsYPhb9TRVhHKaaS-mINTbyXdwUoNjnU1XUo8XdhWqKaGMsrqDn3czJzVNVSUQXuJf6e5afIESW_O-AnxrrzndceSIlVpqtL7pqsD9nBpUk8uNvn2p9oU6ZT2hd0fZYOGqc3tnkMacqg24mhzAs3-zPar6aQW5BvFhOseVFBb9CdykCZZMTkeJJNfVQ5eA8gI8a6f4bUfThgBVgsGo9yc84fTSbaM68SV6H-4niZQCtMhCy4yuFWgfHl5ccyohpWtI01SBFoUpJFJS7VZWPR6VwLrJVpIXUEdZS7syXfVyyC8l0BF6BAeNxlLRtEK-3DQGha6vLtA";
const sdk: JengaApiSdk = new JengaApiSdk(config);
const express = require("express");
const app = express();
const port = 3000;
app.get("/balance", (req, res) => {
  sdk
    .accountBalance({
      params: { countryCode: "KE", accountId: "1100194977404" },
    })
    .then((r: any) => {
      res.send(r.data);
    })
    .catch((r: any) => {
      res.send(r.response.data);
    });
});

app.get("/token", (req, res) => {
  sdk
    .generateToken()
    .then((r: any) => res.send(r.data))
    .catch((r) => res.send(r.response.data));
});
app.get("/enquiry", (req, res) => {
  sdk
    .accountInquiry({
      params: { countryCode: "KE", accountNumber: "0020100014605" },
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((r) => res.send(r.data))
    .catch((r) => r.send(r.response.data));
});
app.post("/openingBalance", (req, res) => {
  sdk
    .openingClosingAccountBalance({
      headers: { Authorization: `Bearer ${accessToken}` },
      data: {
        countryCode: "KE",
        accountId: "0011547896523",
        date: "2017-09-29",
      },
    })
    .then((r) => r.send(r.data))
    .catch((r) => r.send(r.response.data));
});
app.get("/ministatement", (req, res) => {
  sdk
    .accountMiniStatement({
      params: { countryCode: "KE", accountNumber: "0020100014605" },
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((r) => res.send(r.data))
    .catch((r) => res.send(r.response.data));
});
app.post("/fullStatement", (req, res) => {
  sdk
    .accountFullStatement({
      headers: { Authorization: `Bearer ${accessToken}` },
      data: {
        countryCode: "KE",
        accountNumber: "0020100014605",
        fromDate: "2018-01-18",
        toDate: "2018-04-19",
        limit: 3,
      },
    })
    .then((r) => res.send(r.data))
    .catch((r) => res.send(r.response.data));
});

app.listen(port, () => {
  console.log(`Jenga SDK Test App listening on port: ${port}`);
});
