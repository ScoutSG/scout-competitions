export const checkUserIsMember = (
  currentUserId: number,
  members: {
    id: number;
    name: string;
    email: string;
  }[] = []
) => {
  return members.filter((member) => member.id === currentUserId).length !== 0;
};

export const checkUserIsLeader = (currentUserId: number, leaderId: number) => {
  return currentUserId === leaderId;
};
