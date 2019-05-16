import { createClient } from 'contentful';
import Config from "./Config"

const client = createClient({
  space: Config.contenfulSpaceId,
  accessToken: Config.contenfulAccessToken,
});

﻿export default client
