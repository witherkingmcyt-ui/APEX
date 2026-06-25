import { useRef } from "react";
import PageTransition from "../components/layout/PageTransition";
import SectionTitle from "../components/ui/SectionTitle";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import ApexButton from "../components/ui/ApexButton";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useScrollAnimation(contentRef);
  useScrollAnimation(mapRef);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof contactSchema>) {
    console.log(values);
    toast.success("Message sent! We will be in touch soon.");
    form.reset();
  }

  return (
    <PageTransition>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-card overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <SectionTitle 
            title="GET IN TOUCH" 
            subtitle="Have questions? Want to join the team? We'd love to hear from you." 
          />
        </div>
      </section>

      <section ref={contentRef} className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            
            {/* Form */}
            <div className="scroll-animate bg-card border border-white/5 p-8 md:p-10 rounded-2xl">
              <h3 className="font-display text-3xl text-white mb-8">SEND US A MESSAGE</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" className="bg-background/50 border-white/10 focus-visible:ring-primary h-12" {...field} />
                        </FormControl>
                        <FormMessage className="text-destructive" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" type="email" className="bg-background/50 border-white/10 focus-visible:ring-primary h-12" {...field} />
                        </FormControl>
                        <FormMessage className="text-destructive" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help?" 
                            className="bg-background/50 border-white/10 focus-visible:ring-primary min-h-[150px] resize-y" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-destructive" />
                      </FormItem>
                    )}
                  />
                  <ApexButton type="submit" className="w-full">Send Message</ApexButton>
                </form>
              </Form>
            </div>

            {/* Info */}
            <div className="scroll-animate flex flex-col gap-12 justify-center">
              <div>
                <h4 className="font-display text-2xl text-primary mb-4 tracking-wide">Contact Information</h4>
                <div className="flex flex-col gap-4">
                  <a href="tel:714-715-4591" className="text-2xl font-mono text-white hover:text-primary transition-colors inline-block">
                    714-715-4591
                  </a>
                  <a href="mailto:adiashsportsacademy@gmail.com" className="text-lg text-muted-foreground hover:text-primary transition-colors break-all">
                    adiashsportsacademy@gmail.com
                  </a>
                </div>
              </div>

              <div className="h-px w-full bg-white/10" />

              <div>
                <h4 className="font-display text-2xl text-primary mb-4 tracking-wide">Practice Location</h4>
                <div className="text-muted-foreground text-lg leading-relaxed">
                  <p className="text-white font-medium mb-1">Oak Middle School Gym</p>
                  <p>10821 Oak St,</p>
                  <p>Los Alamitos, CA 90720</p>
                </div>
              </div>

              <div>
                <h4 className="font-display text-2xl text-primary mb-4 tracking-wide">Office Address</h4>
                <div className="text-muted-foreground text-lg leading-relaxed">
                  <p>11802 Martha Ann Dr,</p>
                  <p>Los Alamitos, CA 90720</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Maps */}
      <section ref={mapRef} className="py-12 pb-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="scroll-animate bg-card rounded-2xl overflow-hidden border border-white/5 flex flex-col">
              <div className="h-64 relative bg-[#0a0a0a]">
                <iframe 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-118.06941%2C33.79155%2C-118.05941%2C33.80155&amp;layer=mapnik&amp;marker=33.79655%2C-118.06441"
                  title="Oak Middle School Map"
                />
              </div>
              <div className="p-6 flex flex-col items-start gap-4">
                <div>
                  <h4 className="font-bold text-white mb-1">APEX Practice Location</h4>
                  <p className="text-sm text-muted-foreground">Oak Middle School Gym</p>
                </div>
                <a href="https://www.google.com/maps/search/Oak+Middle+School+Los+Alamitos+CA" target="_blank" rel="noopener noreferrer">
                  <ApexButton variant="outline" size="sm">Get Directions</ApexButton>
                </a>
              </div>
            </div>

            <div className="scroll-animate bg-card rounded-2xl overflow-hidden border border-white/5 flex flex-col">
              <div className="h-64 relative bg-[#0a0a0a]">
                <iframe 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-118.050%2C33.800%2C-118.040%2C33.810&amp;layer=mapnik&amp;marker=33.805%2C-118.045"
                  title="Office Map"
                />
              </div>
              <div className="p-6 flex flex-col items-start gap-4">
                <div>
                  <h4 className="font-bold text-white mb-1">AdiAsh Sports Academy Office</h4>
                  <p className="text-sm text-muted-foreground">11802 Martha Ann Dr</p>
                </div>
                <a href="https://www.google.com/maps/search/11802+Martha+Ann+Dr+Los+Alamitos+CA" target="_blank" rel="noopener noreferrer">
                  <ApexButton variant="outline" size="sm">Get Directions</ApexButton>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </PageTransition>
  );
}
