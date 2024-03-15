function NiceLookingBox({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-w-full bg-highlight shadow-sm border-dark border-2">
        {children}
      </div>
    );
  }
  
  export default NiceLookingBox;