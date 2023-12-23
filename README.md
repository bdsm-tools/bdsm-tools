# BDSM Tools
This is the codebase for the BDSM Tools Application containing various tools for BDSM 
practitioners. The code comes in different parts, the React Single Page Application 
plus the various Google Cloud Platform IaaS and PaaS components.

## Environments
Production:     https://bdsmtools.org (latest stable release, data will be kept with best endeavours)  
Testing:        https://test.bdsmtools.org (any version - released or unreleased, data may be deleted without notice)

The production environment is updated when a release is made on Github. The testing
environment is updated manually.

## React SPA
The React Application uses Webpack and can be build using the npm script:
```bash
$ npm run build
```

Or, run dev mode (Run on <http://localhost:3002>):
```bash
$ npm start
```

## Terraform
Terraform is used to create the infrastructure needed for this application. Some infrastructure
such as the cloud functions are deployed and managed in their separate spaces.
```bash
$ cd terraform;
$ terraform init;
$ terraform plan;
$ terraform apply;
```

Terraform is currently not run on CI/CD

## Google Cloud Functions
The API of the app is done using Google Cloud Functions to access data
