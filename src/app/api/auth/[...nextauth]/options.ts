import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { NextAuthOptions } from 'next-auth'

export const authOptions:NextAuthOptions={
    providers:[
    GoogleProvider({
        clientId: process.env.GOOGLE_ID!,
        clientSecret: process.env.GOOGLE_SECRET!
    }),
    GithubProvider({
        clientId:process.env.GITHUB_ID!,
        clientSecret:process.env.GITHUB_SECRET!
    }) 
],
secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    }
}