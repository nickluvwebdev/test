interface ProfileCardProps {
  name: string;
  role: string;
  avatar?: string;
  isActive?: boolean;
}

export default function ProfileCard({
  name,
  role,
  avatar,
  isActive = false,
}: ProfileCardProps) {
  return (
    <div
      className={`card relative ${
        isActive ? "border-2 border-green-500" : "border border-gray-200"
      }`}
    >
      <img
        src={avatar || "https://via.placeholder.com/150"}
        alt={name}
        className="w-full h-full object-cover rounded-xl"
      />
      {isActive && (
        <span className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full"></span>
      )}
      <div className="mt-10 text-center">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-gray-600">{role}</p>
        <p
          className={`mt-3 text-sm px-3 py-1 rounded-full inline-block ${
            isActive
              ? "bg-green-100 text-green-700 font-semibold"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </p>
      </div>
    </div>
  );
}
