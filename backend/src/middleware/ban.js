const User = require('@/models/user');
const Ban = require('@/models/ban');

exports.checkBan = async (req, res, next) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.sendStatus(404);
        }

        const activeBan = await Ban.findOne({
            user: user,
            expiresAt: { $gt: new Date() },
        });

        if (activeBan) {
            return res.sendStatus(403);
        }

        await Ban.deleteMany({ user: userId, expiresAt: { $lte: new Date() } });

        next();
    } catch (error) {
        res.sendStatus(500);
    }
}
