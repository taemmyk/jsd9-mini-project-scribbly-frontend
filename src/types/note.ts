export type Note = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  userId: string;
  isPinned: boolean;
  isPublic: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type UpdatePinPayload = {
  isPinned: boolean;
};

export type UpdatePublicPayload = {
  isPublic: boolean;
};
