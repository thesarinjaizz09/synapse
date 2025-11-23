'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const VideoComponent = () => {
    return (
        <div className="bg-muted relative hidden lg:block overflow-hidden">
            <video
                src="/backgrounds/auth/auth.bg.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.6] dark:grayscale"
            />

            <div className="flex flex-col items-center justify-center absolute inset-0 pointer-events-none flex flex-col justify-center px-16 gap-6">
                <div className="bg-black/35 backdrop-blur-2xl
    rounded-[10px]
    p-3
    border border-white/10
    shadow-[0_0_40px_rgba(0,0,0,0.45)]
    pointer-events-none w-full">
                    <h5 className="text-white font-semibold text-base tracking-wide text-sm">
                        Precision-built automations for high-performance teams.
                    </h5>
                </div>
                <div className="flex items-end justify-center  gap-6">
                    <div className="">
                        <div className="max-w-md space-y-3">
                            <h2 className="text-sm font-semibold tracking-wider text-gray-300">
                                AlphaFusion's Synapse
                            </h2>

                            <h1 className="text-3xl font-bold text-white leading-tight">
                                Welcome to Synapse
                            </h1>

                            <p className="text-gray-300 text-sm leading-relaxed">
                                Synapse powers agentic workflows, AI-driven pipelines, and automation across
                                your ecosystem. Build, deploy, and scale intelligent systems with
                                unmatched precision.
                            </p>

                            <p className="text-gray-400 text-xs pt-1">
                                More than <span className="text-purple-400 font-semibold">1k operators</span> joined us — now it’s your turn.
                            </p>
                        </div>
                        <div
                            className="
        mt-10 max-w-md
        bg-black/40 backdrop-blur-xl
        rounded-[14px] p-6
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
                    <div
                        className="
    w-[320px]
    bg-black/35 backdrop-blur-2xl
    rounded-[15px]
    p-5
    border border-white/10
    shadow-[0_0_40px_rgba(0,0,0,0.45)]
    pointer-events-none
  "
                    >
                        <h3 className="text-white font-semibold text-base tracking-wide mb-4">
                            Live Workflow Activity
                        </h3>

                        <div className="relative flex flex-col gap-1">

                            {/* Node 1 */}
                            <div className="relative flex items-center gap-3">
                                <div className="relative">
                                    <div className="h-4 w-4 bg-purple-500 rounded-full animate-pulse" />
                                    {/* Traveling Signal */}
                                    <div className="absolute left-1/2 top-1/2 h-3 w-3 bg-purple-300 rounded-full animate-flow-signal" />
                                </div>
                                <span className="text-gray-300 text-sm">AI Model Triggered</span>
                            </div>

                            {/* Flow Line 1 */}
                            <div className="relative h-10 flex justify-start">
                                <div className="absolute left-[6.9px] top-0 bottom-0 w-[2px] bg-white/15 rounded-full" />
                                {/* Flow Light */}
                                <div className="absolute left-[4.3px] h-2 w-2 bg-purple-400 rounded-full animate-flow-down" />
                            </div>

                            {/* Node 2 */}
                            <div className="relative flex items-center gap-3">
                                <div className="relative">
                                    <div className="h-4 w-4 bg-blue-400 rounded-full animate-pulse" />
                                    <div className="absolute left-1/2 top-1/2 h-3 w-3 bg-blue-200 rounded-full animate-flow-signal" />
                                </div>
                                <span className="text-gray-300 text-sm">Data Validation Step</span>
                            </div>

                            {/* Flow Line 2 */}
                            <div className="relative h-10 flex justify-start">
                                <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-white/15 rounded-full" />
                                <div className="absolute left-[4.2px] h-2 w-2 bg-blue-300 rounded-full animate-flow-down" />
                            </div>

                            {/* Node 3 */}
                            <div className="relative flex items-center gap-3">
                                <div className="relative">
                                    <div className="h-4 w-4 bg-emerald-400 rounded-full animate-pulse" />
                                    <div className="absolute left-1/2 top-1/2 h-3 w-3 bg-emerald-200 rounded-full animate-flow-signal" />
                                </div>
                                <span className="text-gray-300 text-sm">Automation Executed</span>
                            </div>

                        </div>

                        <div className="mt-4 text-xs text-gray-400">
                            Updated <span className="text-purple-400 font-medium">3s ago</span>
                        </div>
                    </div>

                </div>
                <div
                    className="
    
    w-full
    bg-black/35 backdrop-blur-2xl
    rounded-[15px]
    p-6
    border border-white/10
    shadow-[0_0_50px_rgba(0,0,0,0.45)]
    pointer-events-none
  "
                >
                    <h3 className="text-white font-semibold text-lg">
                        Synapse Intelligence Feed
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed mt-1 mb-4">
                        Real-time insights from your agents, workflow performance signals,
                        and system-level optimizations automatically surfaced for you.
                    </p>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white/5 p-3 rounded-lg text-center border border-white/10">
                            <div className="text-white font-bold text-xl">98%</div>
                            <div className="text-gray-400 text-xs">Uptime</div>
                        </div>

                        <div className="bg-white/5 p-3 rounded-lg text-center border border-white/10">
                            <div className="text-white font-bold text-xl">34</div>
                            <div className="text-gray-400 text-xs">Active Agents</div>
                        </div>

                        <div className="bg-white/5 p-3 rounded-lg text-center border border-white/10">
                            <div className="text-white font-bold text-xl">417</div>
                            <div className="text-gray-400 text-xs">Daily Ops</div>
                        </div>
                    </div>

                    {/* Bottom Glow Divider */}
                    <div className="mt-5 h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

                    {/* Bottom mini-text */}
                    <p className="text-gray-400 text-xs mt-3">
                        Synapse learns from every workflow and improves efficiency —
                        automatically.
                    </p>
                </div>
            </div>
        </div>

    )
}

export default VideoComponent