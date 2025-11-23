'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const VideoComponent = () => {
    return (
        <div className="relative hidden lg:block overflow-hidden">

            {/* Background Video */}
            <video
                src="/backgrounds/auth/auth.bg.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.6] dark:grayscale"
            />

            {/* ---------------------------------------------------------------------- */}
            {/* 🔮 SYNAPSE OVERLAY — Arcana-Style Floating Info Module */}
            {/* ---------------------------------------------------------------------- */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-center px-16">

                {/* Logo / Icon (subtle like Arcana) */}
                <div className="mb-10 opacity-40 scale-125">
                    <Image
                        src="/synapse-mark.svg"   // <- Replace with your Synapse mark
                        alt="Synapse"
                        width={120}
                        height={120}
                        className="select-none"
                    />
                </div>

                {/* Welcome Text Block */}
                <div className="max-w-md space-y-3">
                    <h2 className="text-sm font-semibold tracking-wider text-gray-300">
                        Synapse
                    </h2>

                    <h1 className="text-3xl font-bold text-white leading-tight">
                        Welcome to Synapse
                    </h1>

                    <p className="text-gray-300 text-sm leading-relaxed">
                        Synapse powers agentic workflows, AI-driven pipelines, and automation across
                        the AlphaFusion ecosystem. Build, deploy, and scale intelligent systems with
                        unmatched precision.
                    </p>

                    <p className="text-gray-400 text-xs pt-1">
                        More than <span className="text-purple-400 font-semibold">19k operators</span> joined us — now it’s your turn.
                    </p>
                </div>

                {/* Floating Bubble Card (Arcana Style) */}
                <div
                    className="
        mt-10 max-w-md
        bg-black/40 backdrop-blur-xl
        rounded-[28px] p-6
        border border-white/10 
        shadow-[0px_0px_50px_rgba(0,0,0,0.35)]
      "
                >
                    <h3 className="text-white font-semibold text-lg">
                        Build workflows with Synapse AI
                    </h3>

                    <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                        Create agentic automations, connect models, deploy logic,
                        and visualize your operations effortlessly.
                    </p>

                    {/* Profile Avatars Cluster */}
                    <div className="flex items-center mt-4">
                        <Image
                            src="/avatars/a1.png"
                            alt=""
                            width={28}
                            height={28}
                            className="rounded-full border border-white/20"
                        />
                        <Image
                            src="/avatars/a2.png"
                            alt=""
                            width={28}
                            height={28}
                            className="-ml-2 rounded-full border border-white/20"
                        />
                        <Image
                            src="/avatars/a3.png"
                            alt=""
                            width={28}
                            height={28}
                            className="-ml-2 rounded-full border border-white/20"
                        />

                        <span
                            className="
            ml-3 text-xs text-gray-300 
            bg-white/10 px-3 py-1 rounded-full 
            border border-white/10 backdrop-blur-md
          "
                        >
                            +12 operators active
                        </span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default VideoComponent