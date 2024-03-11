export const GetData = (response) => {
  const {
    data: { data, errors },
    error,
    errors: errors_backend,
  } = response;
  if (data === 'undefined' || !data) {
    if (errors) {
      throw errors;
    } else {
      throw Error('Unexpected error: Data is null');
    }
  }
  if (errors) throw errors;
  if (error) throw error;
  if (errors_backend) return errors_backend;
  return data;
};
export const IsInvalid = (input, text = false) => {
  if (input === null || input === undefined) return true;
  if (text && !input) return true;
  return false;
};
const GetBadUserInputError = (x, code) => {
  if (IsInvalid(x) || x === '') return x;
  if (x.startsWith('BAD_USER_INPUT:') || code === 'BAD_USER_INPUT') {
    const parts = x.replace('BAD_USER_INPUT:', '').trim().split('; Field');
    if (parts.length === 2) {
      return `Field ${parts[1]}`;
    }
  }
  return x;
};
export const ServerErrorsString = (errors, key = '\n') => {
  return ServerErrors(errors).join(key);
};
export const ServerErrors = (errors) => {
  if (typeof errors === 'undefined' || !errors) {
    return ['Errors is undefined'];
  }

  if (errors instanceof TypeError || errors instanceof Error) {
    let { message, name, response, request } = errors;
    console.log('error', { message, name, response, request });
    message = GetBadUserInputError(message);
    if (message === 'Network Error') {
      if (response) {
        // client received an error response (5xx, 4xx)
        message = 'Client received an error response';
      } else if (request) {
        // client never received a response, or request never left
        message = 'Client never received a response, or request never left';
      }
    } else if (response) {
      try {
        if (response.data instanceof Blob) {
          // let blob = new Blob([response.data]);
          let blob = response.data;
          console.log({ blob });
          let json;
          try {
            let buffer = new Buffer.from(blob.arrayBuffer());
            let jsonString = buffer.toString();
            console.log(jsonString);
            json = JSON.parse(jsonString);
            console.log(json);
          } catch (err) {
            console.log('B');
            console.log({ err });
          }
        } else {
          response.data = JSON.parse(response.data);
          if (response.data) {
            const { error } = response.data;
            if (error) {
              const { message } = error;
              if (message) return [`${message}`];
            }
          }
          return ['Unknown error'];
        }
      } catch (error) {
        console.log('C');
        return ServerErrors(error);
      }
    }
    if (message && name) {
      return [`${name}: ${message}`];
    } else if (message) {
      return [`${message}`];
    } else {
      return ['Unknown error type'];
    }
  }
  if (errors && typeof errors === 'string' && errors.constructor === String) {
    return [`${errors}`];
  }

  if (errors && typeof errors === 'object' && errors.constructor === Object) {
    const { error } = errors;
    if (error) {
      return [`${error}`];
    }
    return [`${errors}`];
  }
  let final_errors = errors.map((x) => {
    if (x && typeof x === 'string' && x.constructor === String) {
      return GetBadUserInputError(x);
    }
    let { message, extensions } = x;
    let server_code = '';
    let server_message = 'Unknown internal server error';
    if (extensions && typeof extensions !== 'undefined') {
      const { code } = extensions;
      if (code) {
        server_code = code;
      }
    }
    if (message && message !== '') {
      server_message = GetBadUserInputError(message, server_code);
    }
    if (server_code === '') {
      return `${server_message}`;
    }
    return `${server_code}: ${server_message}`;
  });
  console.log({ final_errors });
  if (final_errors.length > 10) {
    const total = final_errors.length;
    final_errors = final_errors.splice(0, 10);
    final_errors.push(`\nThere are ${total - 10} more errors...`);
  }
  return final_errors;
};
