import MoonLoader from "react-spinners/MoonLoader"

const override = {
  display: "block",
  margin: "50px auto",
};

export const Spinner = () => {
  return (
    <MoonLoader
      cssOverride={override}
      size={100}
      color="#5E96FC"
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  )
}