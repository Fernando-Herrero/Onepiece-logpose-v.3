export type Privacy = {
    showBookmarked: boolean;
    showComments: boolean;
    showLikes: boolean;
    showPosts: boolean;
};

export type SerieProgress = {
    arc: number;
    episode: number;
    saga: number;
};

export interface UserAuth {
    id?: string;
    _id?: string;
    verified: boolean;
    username: string;
    updatedAt: string;
    address: string;
    avatar: string;
    bio: string;
    coverImage: string;
    createdAt: string;
    displayName: string;
    email: string;
    experience: number;
    firstName: string;
    isActive: boolean;
    lastName: string;
    name: string;
    phoneNumber: string;
    role: "admin" | "user";
    privacy: Privacy;
    bookings: string[];
    followers?: string[];
    following?: string[];
    orders: string[];
    serieProgress: SerieProgress;
}

export type AuthContextValue = {
    user: UserAuth | null;
    setUser: React.Dispatch<React.SetStateAction<UserAuth | null>>;
    loading: boolean;
    error: string | null;
    isAdmin: boolean;
    isVerified: boolean;
    userPrivacy: Privacy;
    clearError: () => void;
};

export interface AuthResponse {
    token: string;
    user: UserAuth;
}

export interface LogoutResponse {
    message: string;
    logout: boolean;
    user: string;
}

export interface DeleteResponse {
    ok: string;
    removed: UserAuth;
}

export interface StatsResponse {
    myPosts: number;
    likedPosts: number;
    bookmarkedPosts: number;
    commentedPosts: number;
    totalComments: number;
}

export interface PostUserId {
    username: string;
    firstName?: string;
    lastName?: string;
    displayName: string;
    avatar: string;
    verified: boolean;
    id: string;
}

export interface CommentResponse {
    _id?: string;
    postId: string;
    userId: PostUserId;
    text: string;
    images: string[];
    likes: string[];
    likesCount: number;
    repliesCount: number;
    isReply: boolean;
    hashtags: string[];
    mentions: string[];
    isDeleted: boolean;
    source: string;
    language: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id?: string;
}

export interface PostResponse {
    _id?: string;
    id?: string;
    // userId: UserPost;
    text: string;
    images: string[];
    likes: string[];
    bookmarks: string[];
    commentsCount: number;
    likesCount: number;
    bookmarksCount: number;
    hashtags: string[];
    mentions: string[];
    retweets: string[];
    retweetsCount: number;
    isRetweet: boolean;
    isReply: boolean;
    visibility: string;
    isPinned: boolean;
    isDeleted: boolean;
    language: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    userLiked: boolean;
    userBookmarked: boolean;
    comments?: CommentResponse[];
}

export type PostsResponse = PostResponse[];

export type RegisterPayload = {
    name: string;
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName: string;
    role: "user" | "admin";
    avatar: string;
};

export type LoginPayload = {
    email: string;
    password: string;
};

// export type FollowType = keyof typeof FOLLOW_CONFIG;
