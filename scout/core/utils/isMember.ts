export const checkUserIsMember = (currentUserId: number, members: {
  id: number;
  name: string;
  email: string;
}[]) => {
  return members.filter(member => member.id === currentUserId).length !== 0;
}