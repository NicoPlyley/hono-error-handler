# Hono Error Handler

This is a custom error handler middleware for the [Hono](https://hono.dev/) web framework.
It allows you to define and use your own error handling functions while providing some default error 
handling behavior.

## Installation

You can install the package with:

```bash
npm install hono-error-handler
yarn add hono-error-handler
bun install hono-error-handler
```

## Usage

Simplify error handling in your JSON API applications with the `hono-error-handler` package. 
This package streamlines error management within your route handlers by providing an easy way to 
create custom errors with associated status codes using `ErrorResponse`. By using the `errorHandler`, you can eliminate the need for extensive try-catch blocks in your routes, resulting in 
cleaner and more maintainable code. Additionally, the `errorHandler` ensures consistent error responses 
in JSON format across your application. If you need to throw errors in your routes, 
`ErrorResponse` simplifies the process. Without any custom error handlers defined, 
the default behavior is to return a 500 Internal Server Error response in JSON.

### Create Error Handlers

**Syntax**: The function is defined as follows:
```ts
const handleMongooseErrors = (error: CustomErrorHandler) => {
  // Error handling logic here
};
```
> (error: CustomErrorHandler) => declares an arrow function that takes one parameter named error, 
which is of type CustomErrorHandler.

 - **Parameter (error: CustomErrorHandler)**: 
The error parameter represents an error object that is expected to conform to the 
CustomErrorHandler interface. This error will be passed to your function automatically.


- **Using If Statements**: Inside the function, there are multiple if statements that check for specific 
conditions related to your error types. These conditions are used to identify and handle 
different error scenarios.


- **Return**: When a specific condition is met, the function modifies the error object to provide a more 
informative error message and sets an appropriate status code. For example:

```ts
// Mongoose bad ObjectId
if (error.name === 'CastError') {
  error.message = 'Resource not found';
  error.statusCode = 400;
  return error;
}
```
> In this case, if the error's `name` property matches 'CastError', the function updates the
`error` object's message and `statusCode` properties and immediately returns the modified `error` object.

- **Default Return**: At the end of the function, there's a default return statement:

```ts
return error;
```

> This default return ensures that if none of the specific conditions are met 
(i.e., the error doesn't match any known Mongoose error type), the original `error` object is 
returned without modification.

Here is a full example of a custom error handler with mongoose:

```ts
import { CustomErrorHandler } from 'hono-error-handler';

const handleMongooseErrors = (error: CustomErrorHandler) => {
  // Mongoose bad ObjectId
  if (error.name === 'CastError') {
    error.message = 'Resource not found';
    error.statusCode = 400;
    return error;
  }

  // Mongoose duplicate key
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    error.message = `${field} is already registered`;
    error.statusCode = 400;
    return error;
  }

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    let message = '';
    Object.values(error.errors).map((val: any) => {
      message += `${val.message},`;
    });
    error.message = message;
    error.statusCode = 400;
    return error;
  }

  return error;
};

export default handleMongooseErrors;
```

### Adding The Error Handler To Your App

Import the error handler

```ts
import { errorHandler } from 'hono-error-handler';
````



Import your custom error handler function:

```ts
import handleMongooseErrors from './handleMongooseErrors';
```

Create an array of your custom error handlers.
This array will be passed to the errorHandler function.

```ts
const errorHandlers = [handleMongooseErrors, additionalErrorhander];

```

Set up the error handler for your app. Pass in the `errorHandlers` array as the first argument to 
`errorHandler`. You can also specify whether to print error stacks to the console 
(optional, default is true) as the second argument.

```ts
app.onError(errorHandler(errorHandlers, false));
```
### Throwing Custom Errors In Routes

Import the `ErrorResponse` class:

```ts
import { ErrorResponse } from 'hono-error-handler';
```

In your route handler, when you encounter a condition that should result in an error response, 
create a new instance of ErrorResponse. Provide the error message and status code as arguments to 
the constructor. For example:

```ts
app.get('/exmaple', (c) => {
  // Check some condition
  if (someConditionIsNotMet) {
    // Throw a custom error using ErrorResponse
    throw new ErrorResponse('Resource not found', 404);
  }

  // Your regular route logic
  // ...
});
```

> This will bypass the `errorHandler` and immediately send the response


## Parameters

`errorHandler` Parameters

| Parameter       | Type               | Description                                                                                                     | Default |
|-----------------|--------------------|-----------------------------------------------------------------------------------------------------------------|---------|
| `errorHandlers` | Array of Functions | An array of custom error handlers that modify error objects based on specific error conditions.                 | []      |
| `printStack`    | Optional Boolean   | A boolean flag that determines whether to print the stack trace of the error to the console. Default is `true`. | `true`  |

 `ErrorResponse` Parameters


| Parameter    | Type    | Description                                                         | Default |
|--------------|---------|---------------------------------------------------------------------|---------|
| `message`    | String  | A string describing the nature of the error.                        | N/A     |
| `statusCode` | Integer | An HTTP status code indicating the error's nature (e.g., 400, 401). | 500     |

## Contributing

We welcome contributions from the community to enhance and improve the `hono-error-handler` package. If you'd like to contribute, please follow these steps:

1. **Fork the Repository:** Start by forking the [hono-error-handler repository](https://github.com/nicoplyley/hono-error-handler) on GitHub to your own GitHub account.

2. **Clone the Repository:** Clone the forked repository to your local development environment:

   ```bash
   git clone https://github.com/nicoplyley/hono-error-handler.git
   ```

3. **Create a New Branch:** Create a new branch for your contribution. Use a descriptive branch name that reflects the nature of your changes:

   ```bash
   git checkout -b your-feature-name
   ```

4. **Make Changes:** Implement your changes or additions to the codebase. Ensure that your code follows the project's coding style and conventions.

5. **Test Your Changes:** Run tests to make sure your changes do not introduce new issues. If applicable, update or add tests to cover your code changes.

6. **Commit Changes:** Commit your changes with a clear and concise commit message:

   ```bash
   git commit -m "feat: Add new feature" (or "fix: Fix issue #123")
   ```

7. **Push Changes:** Push your branch to your forked repository on GitHub:

   ```bash
   git push origin your-feature-name
   ```

8. **Create a Pull Request:** Go to the [hono-error-handler repository](https://github.com/nicoplyley/hono-error-handler) on GitHub, and you should see a "New Pull Request" button. Click it, and create a pull request from your forked branch to the main repository.

9. **Discuss and Review:** Participate in discussions and reviews related to your pull request. Make any necessary updates based on feedback from maintainers and contributors.

10. **Merge and Deploy:** Once your pull request is approved, it will be merged into the main repository. The changes will be deployed in future releases.

Thank you for contributing to `hono-error-handler`! Your contributions help make the package better for everyone.
nicoplyley/hono-error-handler) on GitHub to your own GitHub account.
