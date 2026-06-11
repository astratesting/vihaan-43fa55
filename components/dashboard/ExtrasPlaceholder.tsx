import Card from "@/components/ui/Card";

const extras = [
  { name: "Vitamin D3 drops", description: "Extra sunshine in a bottle." },
  { name: "Fiber powder sticks", description: "Mix into any drink." },
  { name: "Bedtime tea", description: "Calm evenings for the whole family." },
];

export default function ExtrasPlaceholder() {
  return (
    <div>
      <h2 className="text-xl font-heading font-bold text-ink mb-4">Extras</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {extras.map((item) => (
          <Card key={item.name} className="relative opacity-70">
            <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-muted/10 text-muted text-xs font-heading font-semibold">
              Coming soon
            </span>
            <h3 className="text-base font-heading font-bold text-ink pr-16">{item.name}</h3>
            <p className="mt-1 text-sm text-muted font-body">{item.description}</p>
            <button
              disabled
              aria-disabled="true"
              className="mt-3 px-4 py-1.5 rounded-full bg-muted/20 text-muted text-sm font-heading font-semibold cursor-not-allowed"
            >
              Add
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
