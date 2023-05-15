import {ICharacter} from "./types"

export declare global {
  interface Window {
    __SSR_DATA__?: ICharacter[]
  }
}
