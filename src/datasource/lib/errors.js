/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { createError } from 'apollo-errors';


export const GenericError = createError('GenericError', {
  message: 'A generic error has occurred', // TODO: NLS
});

export const NetworkError = createError('NetworkError', {
  message: 'A network error error has occurred', // TODO: NLS
});
