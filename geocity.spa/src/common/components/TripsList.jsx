import TripCard from "./TripCard";

export const TripsList = (props) => {
  return (
    <>
      {props.data &&
        props.data.map((trip) => {
          return <TripCard key={trip.id} data={trip} edit={props.edit} />;
        })}
    </>
  );
};
export default TripsList;
