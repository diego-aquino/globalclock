const messageContents = {
  'userPosition.geolocationNotSupported': (
    <>
      Sorry. Geolocation is not supported by your browser.
      <br />
      Try updating it, or search the city you&apos;re currently in by its name.
    </>
  ),
  'userPosition.geolocationRequestFailed': 'Sorry. Could not locate you.',
  'default.somethingWentWrong': (
    <>
      Oops! Something went wrong.
      <br />
      Please try again later.
    </>
  ),
};

export default messageContents;
