import { outfit } from "@/fonts/google";
import Opening from "@/components/Opening";
import MainLayout from "@/components/layout/MainLayout";

export default function Home() {

  return (
    <MainLayout opening={<Opening />} className={outfit.className}>
      <div className="h-[200vh]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas voluptas dignissimos earum eum vero, aliquid error temporibus voluptatem eligendi quo placeat quos similique nemo amet inventore nobis ipsa sunt harum.
      </div>
    </MainLayout>
  );
}