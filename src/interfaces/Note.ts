/* eslint-disable semi */
/* eslint-disable no-extra-semi */
/* eslint-disable @typescript-eslint/no-extra-semi */
export default interface Note {
  id?         : string;
  title       : string;
  description : string;
  icon        : string | string[];
  color?      : string;
  creationDate: Date;
  updatedDate : Date;
};
