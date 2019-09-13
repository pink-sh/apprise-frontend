
import { UserState, initialUsers } from "apprise-frontend/user";
import { ConfigState, initialConfig } from "apprise-frontend/config";
import { IntlState, initialIntl } from "apprise-frontend/intl";
import { SlideoutState, initialSlideout } from "apprise-frontend/scaffold/slideout";

export type BaseState = UserState & ConfigState & IntlState & SlideoutState

export const initialBase = {

  ...initialUsers,
  ...initialIntl,
  ...initialConfig,
  ...initialSlideout
}

