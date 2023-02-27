import type { LoDashStatic } from "lodash";
import type ziggy from "ziggy-js";
import type { Axios } from "axios";
import Pusher from "pusher-js/types/src/core/pusher";
import Echo from "laravel-echo";

declare global {
  var route: typeof ziggy;
  var axios: Axios;
  var Pusher: typeof Pusher;
  var Echo: Echo;
}
