import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-extrabold">Components :</h1>
      <hr className="mb-4" />

      <div className="flex flex-col w-fit gap-3">
        <Button>Hello world</Button>
        <Button size={"lg"}>Hello world</Button>
      </div>
    </div>
  );
}
