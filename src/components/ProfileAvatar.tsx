import { Avatar } from '@mui/material';

interface ProfileAvatarProps {
    size?: number;
    seed?: string;
}

const ProfileAvatar = ({ size = 40, seed = 'Alex' }: ProfileAvatarProps) => {
    const profileImageUrl = `https://api.dicebear.com/6.x/avataaars/svg?seed=${seed}`;

    return (
        <Avatar
            src={profileImageUrl}
            alt="Profile"
            sx={{
                width: size,
                height: size,
                border: '2px solid',
                borderColor: 'primary.main'
            }}
        />
    );
};

export default ProfileAvatar;