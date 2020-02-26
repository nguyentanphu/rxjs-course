import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export enum DebugLoggingLevel {
  TRACE,
  DEBUG,
  INFO,
  ERROR
}

let rxjsLoggingLevel = DebugLoggingLevel.INFO;

export function setLoggingLevel(level: DebugLoggingLevel) {
  rxjsLoggingLevel = level;
}

export const debug = (level: DebugLoggingLevel, message: string) => (
  source: Observable<any>
) =>
  source.pipe(
    tap(val => {
      if (level >= rxjsLoggingLevel) {
        console.log(message);
      }
    })
  );
