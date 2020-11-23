A list of changes that have occured through the versions.

4.2.0
-----

- `async-storage` changed homes, so updated the dependency source (props to [@taylora123](https://github.com/taylora123]))

4.1.0
-----

- 4.1.0 - Add TypeScript .d.ts file (props to [@randomBrainstormer](https://github.com/randomBrainstormer))

4.0.1
-----

- Fix for missing `storeUrl` bug (plus some small updates to README).

4.0.0
-----

- *Breaking:* Minimum RN version compatibility now at 0.57+
- *Breaking:* Switch to using community AsyncStorage because of Lean Core, so it's now a peer dependency. Props to [@imranariffin](https://github.com/imranariffin)
- Uses the native SKStoreReview dialog on iOS 10.3+. Props to [@jasonlfunk](https://github.com/jasonlfunk)

3.2.1
-----

- Remove `console.log` call that was unnecessarily cluttering up output, especially in tests. Props to [@nlively](https://github.com/nlively)

3.2.0
-----

- Allow iOS country store and app name to be set. Props to [@andreleon](https://github.com/andreleon)

3.1.0
-----

- Formalize the `shouldBoldLastButton` so that it's less a mystery. Props to [@ttargo1](https://github.com/ttargo1).

3.0.0
-----

- **Breaking:** Update RN minimum dependency to v0.26 to support `Platform.select()`.
- Allow changing the order of the buttons on different platforms. Impetus and help from [@yihanseattle](https://github.com/yihanseattle), [@olzhasipsy](https://github.com/olzhasipsy), and [@kesha-antonov](https://github.com/kesha-antonov).

2.1.0
-----

- Updated iOS store URL for iOS 11 compatibility thanks to [@rodrigopk](https://github.com/rodrigopk)

2.0.0
-----

- Now supports Android as well. Requires React Native v0.20.0 or greater.
- Added ability to immediately show the rating dialog on-demand with `showRatingDialog`. Props to [@maximilianhurl](https://github.com/maximilianhurl).


1.1.0
-----

- Added an optional callback to `handlePositiveEvent()` that reports on the result of the handling. Props to [@sercanov](https://github.com/sercanov).


1.0.0
-----

- Initial release
