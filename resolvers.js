const Booking = require('./models/Booking')
const Listings = require('./models/Listings')
const User = require('./models/User')

exports.resolvers = {
    Query: {
        getUser: async (parentss, args) => {
            return await User.find({})
        },
        login: async (parents, args) => {
            let user = await User.findOne({ $and: [{ username: args.username }, { password: args.password }] })
            if (!user) {
                throw new Error("User & Password not same")
            }
            if (user.type == 'admin') {
                return { secret: process.env.SECRET_ADMIN }
            } else {
                return { secret: process.env.SECRET_USER }
            }
        },
        getUserBooking: async (parents, args) => {
            let bookings = []
            if (args.username) {
                if (args.secret == process.env.SECRET_USER) {
                    bookings = await Booking.find({ username: args.username })
                } else {
                    throw new Error("Must be logged in")
                }
            } else {
                if (args.secret == process.env.SECRET_ADMIN) {
                    bookings = await Booking.find({})
                } else {
                    throw new Error("Must be an Admin")
                }
            }
            return bookings
        },
        getAdminListings: async (parents, args) => {
            if (args.secret == process.env.SECRET_ADMIN) {
                return await Listings.find({})
            } else {
                throw new Error("Must be an Admin")
            }
        },
        searchListingByName: async (parents, args) => {
            return await Listings.find(args)
        },
        searchListingByCity: async (parents, args) => {
            return await Listings.find(args)
        },
        searchListingByPostalCode: async (parents, args) => {
            return await Listings.find(args)
        },
    },

    Mutation: {
        addUser: async (parents, args) => {
            let user = User({
                username: args.username,
                firstname: args.firstname,
                lastname: args.lastname,
                password: args.password,
                email: args.email,
                type: args.type
            })
            return user.save()
        },
        createListing: async (parents, args) => {
            if (args.secret == process.env.SECRET_ADMIN) {
                let listing = new Listings(args)
                return listing.save()
            }
            throw new Error("Failed")
        },
        createBooking: async (parents, args) => {
            if (args.secret == process.env.SECRET_ADMIN) {
                let booking = new Booking(args)
                return booking.save()
            }
            throw new Error("Failed")
        }
    }
}