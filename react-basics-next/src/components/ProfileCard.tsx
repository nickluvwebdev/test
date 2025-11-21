import styles from "./ProfileCard.module.css";
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
      className={styles.card}
    >
      <img
        src={avatar || "https://via.placeholder.com/150"}
        alt={name}
        className={styles.avatar}
      />
      {isActive && (
        <span className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full"></span>
      )}
      <div className="mt-10 text-center">
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.role}>{role}</p>
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
