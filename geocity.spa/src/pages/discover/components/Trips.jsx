import TripCard from "./TripCard";

export const Trips = (props) => {
  return (
    <>
      {props.data &&
        props.data.map((trip) => {
          return <TripCard key={trip.id} data={trip} />;
        })}
    </>
  );
};
export default Trips;
