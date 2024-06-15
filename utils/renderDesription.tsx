export const renderDescription = (key: string, text: string) => {
  return text.split("\n").map((paragraph, index) => (
    <p key={`${key}-paragraph-${index}`} className="even:mt-3">
      {paragraph}
    </p>
  ))
}
