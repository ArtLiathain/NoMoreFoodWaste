type CardProps = {
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="shadow rounded bg-highlight text-center flex-col inline-flex">
    {children}
    </div>;
};

export default Card;
