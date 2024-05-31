import Heading from "@/components/dashboard/Heading";
import { Button } from "@/components/ui/button";
import UserDialog from "@/components/users/UserDialog";
import UsersTable from "@/components/users/users-table";
import { User } from "@/types";

const UsersPage = () => {
  const data: User[] = [
    {
      id: "user_1",
      fullName: "Alice Johnson",
      email: "alice.johnson@example.com",
      role: "OWNER",
    },
    {
      id: "user_2",
      fullName: "Bob Smith",
      email: "bob.smith@example.com",
      role: "MANAGER",
    },
    {
      id: "user_3",
      fullName: "Charlie Davis",
      email: "charlie.davis@example.com",
      role: "WORKER",
    },
  ];
  return (
    <>
      <Heading title="Users" description="users you invited appear here" />
      <UserDialog
        trigger={
          <Button size="lg" className="self-end">
            Add User
          </Button>
        }
        initialData={null}
      />
      <UsersTable data={data} />
    </>
  );
};

export default UsersPage;
