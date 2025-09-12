"use client";

import { Hero } from "@/components/section/hero-12";
import { Feature } from "@/components/section/feature-13";
import { SplitMedia as SplitMedia06 } from "@/components/section/split-media-06";
import { Testimonials } from "@/components/section/testimonials-04";
import { CTA } from "@/components/section/cta-09";

export default function Home() {
  return (
    <main>
      <Hero
        eyebrow=""
        title="AI front desk that keeps your WebPT schedule full"
        subtitle="Penciled texts patients to schedule plans of care, send reminders, and fill cancellations — so you add visits and shorten front desk workload."
        primaryButtonText="Book a Demo"
        primaryButtonHref="#demo"
        videoUrl="/demo.mp4"
        videoPoster="/video-poster.jpg"
      />

      <Feature
        title="What Penciled does for you"
        subtitle="Penciled was built inside of physical therapy front offices to eliminate hundreds of hours of sending text messages in Weave."
        items={[
          {
            icon: () => <span className="h-6 w-6" />,
            title: "Plan of Care",
            description: "Make sure every prescribed visit is on the schedule.",
          },
          {
            icon: () => <span className="h-6 w-6" />,
            title: "Reminders",
            description:
              "Send clear, customizable reminders with easy confirmations, reschedules, and cancellations.",
          },
          {
            icon: () => <span className="h-6 w-6" />,
            title: "Waitlist",
            description:
              "Rapidly fill cancellations by automatically reaching out to patients.",
          },
          {
            icon: () => <span className="h-6 w-6" />,
            title: "Rescheduling",
            description:
              "Let patients reschedule instantly so they don't miss visits.",
          },
          {
            icon: () => <span className="h-6 w-6" />,
            title: "Cancellation fees",
            description:
              "Require fee payment within 24 hour cancellation window.",
          },
          {
            icon: () => <span className="h-6 w-6" />,
            title: "No show fees",
            description:
              "Request no show fees with no awkward human interactions.",
          },
          {
            icon: () => <span className="h-6 w-6" />,
            title: "Calendar Invites",
            description:
              "Get your visits onto patients' calendars- front and center.",
          },
          {
            icon: () => <span className="h-6 w-6" />,
            title: "Google reviews",
            description: "Collect reviews automatically to grow your practice.",
          },
          {
            icon: () => <span className="h-6 w-6" />,
            title: "Automatic",
            description:
              "Penciled runs in the background so you can focus on your patients.",
          },
        ]}
      />

      <SplitMedia06
        eyebrow="Demo"
        title="See Penciled in action"
        subtitle={
          "Plan of care, reminders, and waitlist — booked automatically in WebPT"
        }
        imageSrc="/split-media.jpg"
      />

      <Testimonials
        title="Your success is our top priority"
        subtitle="Penciled is a team of software engineers from Harvard and MIT based in San Francisco, funded by same top-tier VCs like Y Combinator and Initialized Capital. We are the fastest-shipping dev team in the industry. Our customers tell the story."
        testimonials={[
          {
            id: "1",
            name: "Steve Mongiello",
            role: "Owner",
            image:
              "https://framerusercontent.com/images/91hO1gAvXMNks4AcPiPuEXJrsU.jpeg",
            content:
              "Penciled saved our front offices **hundreds of hours every month** dealing with the waitlist, and we saw over **35X ROI** on cancellations re-booked by Penciled. Results were immediate once they launched the WebPT integration. If you are on WebPT, this is a no-brainer.",
          },
          {
            id: "2",
            name: "Susana",
            role: "Lead front office coordinator",
            image:
              "https://framerusercontent.com/images/PMBKP22lvVNHCfmcLAZKoZStZ9o.jpeg",
            content:
              "I like that it would automatically fill the appointment on the schedule.",
          },
          {
            id: "3",
            name: "Nicole Sabes",
            role: "Clinic director",
            image:
              "https://framerusercontent.com/images/wsFlvvYAsvtMvCtEAajIExwFbWA.jpg",
            content:
              "For us it's been great because we moved from 3 to 2 front office staff which is super cost effective, and it allows our front office to be more present with patients in the clinic providing a better overall experience.",
          },
          {
            id: "4",
            name: "Adelle",
            role: "Front office coordinator",
            image:
              "https://framerusercontent.com/images/OMKQJKabCIYhF7knHCBBGEPIuY.jpg",
            content:
              "I loved the scheduling aspect! I didn't have to think about what needed to be filled which saved a lot of stress",
          },
          {
            id: "5",
            name: "Angelica Moises",
            role: "PT intern",
            image:
              "https://framerusercontent.com/images/CZNOIfaWUs4yyBY4HLu6QVSnCB4.jpg",
            content:
              "Quickly sending out openings to patients once a cancellation occurs.",
          },
          {
            id: "6",
            name: "Cassie",
            role: "Clinic director",
            image:
              "https://framerusercontent.com/images/2vKA3Xe9DUhDKSM93DFcQKReoA.jpg",
            content:
              "I like that it integrated into our schedule, you could clearly see when it was running and when it was filled. I also liked that you could see a list of messages that the bot could not respond to on its own so we could make sure no communications were missed.",
          },
          {
            id: "7",
            name: "Sarah Rao",
            role: "Program manager",
            image:
              "https://framerusercontent.com/images/0yMFNS32kFv0kuQKhuwcz0kDOo.png",
            content:
              "The Penciled platform and team have been instrumental in our clinic's success... Our utilization drastically increased, and our patients were excited to snag last minute openings when they were only expecting their next appointment to be months out.",
          },
          {
            id: "8",
            name: "Tamara Keyes",
            role: "Front office coordinator",
            image:
              "https://framerusercontent.com/images/WtGMZ6VC04Qb1dzFXM0hgoxuso.jpg",
            content:
              "This new platform is fantastic! What took hours to fill our appointments each week, now takes seconds. Thanks for helping to make our front office work much more efficient.",
          },
          {
            id: "9",
            name: "Lety",
            role: "Front office coordinator",
            image:
              "https://framerusercontent.com/images/5iSAguLTHjntV5pbYVXUSC09hk.jpeg",
            content:
              "I like how it saved me time from manually going through the waitlist myself.",
          },
          {
            id: "10",
            name: "Giulia Serbia",
            role: "Front office coordinator",
            image:
              "https://framerusercontent.com/images/zIT04coUGLcbstbottBAQuA2vOE.jpeg",
            content:
              "It was very satisfying to look at the schedule and see a spot filled up",
          },
          {
            id: "11",
            name: "Nicole Sabes",
            role: "Clinic director",
            image:
              "https://framerusercontent.com/images/wsFlvvYAsvtMvCtEAajIExwFbWA.jpg",
            content:
              "Shawn and the team were super helpful and adaptive with making changes and adjusting to what our clinic needed",
          },
          {
            id: "12",
            name: "Addison",
            role: "Business manager",
            image:
              "https://framerusercontent.com/images/f9pdsvKgx9GTDjWZFK25hd90wZA.jpeg",
            content:
              "Penciled has great customer service and is always ready to solve the next problem!",
          },
          {
            id: "13",
            name: "Anjani",
            role: "PT intern",
            image:
              "https://framerusercontent.com/images/iN4fnG3bOiT3njIwvsryR3qg.png",
            content:
              "I think Penciled was very convenient, and in just a few clicks I was able to waitlist patients for weeks at a stretch.",
          },
          {
            id: "14",
            name: "Sarah Meech",
            role: "Physical therapist",
            image:
              "https://framerusercontent.com/images/pyOIyBaZ0DqqtDVWpwKRMCC7Neo.jpeg",
            content: "Customization and tech support was great.",
          },
          {
            id: "15",
            name: "Kha Nguyen",
            role: "Clinic director",
            image:
              "https://framerusercontent.com/images/g4ecF1bGQy1mdY3qwmqmaCsW2RQ.jpeg",
            content:
              "Penciled has been a game-changer with how we do our waitlist and the seamless integration with WebPT is phenomenal.",
          },
          {
            id: "16",
            name: "Sophia",
            role: "Front office coordinator",
            image:
              "https://framerusercontent.com/images/1CRyax6Mon3JSZDWmVo4dIJMhE.jpg",
            content:
              "Trusting the bot to book appts in messages and scheduling software without double booking.",
          },
          {
            id: "17",
            name: "Olivia",
            role: "Front office coordinator",
            image:
              "https://framerusercontent.com/images/DeyLOOrgRNbV9ngoY78BVgAEY.jpg",
            content:
              "It helped schedule when we needed to focus on other things.",
          },
          {
            id: "18",
            name: "Jessica",
            role: "Clinic director",
            image:
              "https://framerusercontent.com/images/Vm0En0XOAtK0BIMmsKipor6Y.jpg",
            content:
              "Liked how it signaled when a cancel was processed and automatically put people into the schedule when they agreed to an appointment... different priorities of patients.",
          },
          {
            id: "19",
            name: "Imee",
            role: "Chief growth officer",
            image:
              "https://framerusercontent.com/images/qRLzuN8a7IuLf408cUQWhXnHuy4.jpeg",
            content:
              "Streamlining the waitlist was what Pencil promised and that’s what it delivered!... the development team was so open to feedback!",
          },
        ]}
      />

      <CTA
        title="See how you can grow your practice"
        subtitle="Find out if your practice could benefit from an AI front office assistant."
        primaryButtonText="Book a Demo"
        primaryButtonHref="#demo"
      />
    </main>
  );
}
