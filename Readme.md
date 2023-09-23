# Node Express Backend Boilerplate

## Pre-requisites
# Docker is installed and already knows about how to set up Postgres Db
# Npm is installed
# Already aware of setting env configurations
# Below sample schema Model used to build this project
    Schema model the relations
    * An Asset has one or more Categories
    * A Collection has one or more Assets
    * A Collection has one or more


## Database setup
Execute npm run init-schema in the command prompt. This will create Asset Table in the database.

## Assumptions
1. No file uploading is done while creating an asset
2. File type is randomly generated number between 1-5. This could an const object/enum containg list of file/doc types.
3. There is no scope to add categories in the Asset because of time constraint.
4. Basic tests are added to show that code is testable.
5. Basic Linting rules are added. 


## Asset 
1. Asset model contains asset_id, name, description, filetype, createdon, isactive atributes.
2. Create, Read and Delete operations on Asset.
3. Base response format is { error: "", data: [] }. Depending on the outocme of operation, this format is sent in response.
4. Joi validation helps to validate the request input.


## Future scope
1. The above mentioned schema can be built similar to asset with its dependencies.
2. Authentication using JWT and verify token middleware before controller call.
3. Improvement in Error handling of Postgres errors by creating new error class handler derived from Base error class.
4. Logging of errors, response.
5. Caching of the requests using Redis/Memcache
6. Test coverage
7. Improvement of Linting using specific libraries may be like eslint-config-airbnb-typescript.
8. Integrating Swagger for the other developers to understand request response format.