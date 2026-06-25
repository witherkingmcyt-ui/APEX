import { useRef } from "react";
import PageTransition from "../components/layout/PageTransition";
import SectionTitle from "../components/ui/SectionTitle";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import ApexButton from "../components/ui/ApexButton";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";

const joinSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  grade: z.string().min(1, "Grade is required"),
  school: z.string().min(2, "School is required"),
  heightFeet: z.string().min(1, "Feet is required"),
  heightInches: z.string().min(1, "Inches is required"),
  positions: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You have to select at least one position.",
  }),
  experience: z.string().optional(),
  parentName: z.string().min(2, "Parent/Guardian name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  parentPhone: z.string().min(10, "Valid phone number is required"),
  parentEmail: z.string().email("Valid email is required"),
  medical: z.string().optional(),
  insurance: z.string().optional(),
  referral: z.string().optional(),
});

export default function Join() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useScrollAnimation(formRef);

  const form = useForm<z.infer<typeof joinSchema>>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: "",
      grade: "",
      school: "",
      heightFeet: "",
      heightInches: "",
      positions: [],
      experience: "",
      parentName: "",
      relationship: "",
      parentPhone: "",
      parentEmail: "",
      medical: "",
      insurance: "",
      referral: "",
    },
  });

  function onSubmit(values: z.infer<typeof joinSchema>) {
    console.log(values);
    toast.success("Registration submitted! Coach Patel will contact you within 48 hours.");
    form.reset();
  }

  const positionsList = ["PG", "SG", "SF", "PF", "C"];

  return (
    <PageTransition>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-card overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <SectionTitle 
            title="JOIN APEX" 
            subtitle="Take your game to the next level. Apply to join one of Southern California's most competitive travel ball programs." 
          />
        </div>
      </section>

      {/* Form Section */}
      <section ref={formRef} className="py-24 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl scroll-animate">
          <div className="bg-card border border-primary/20 p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
            {/* Glossy top edge */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50" />
            
            <p className="text-primary font-medium text-center mb-12 uppercase tracking-wide border-b border-white/10 pb-6">
              This form is not a guaranteed roster spot. A coach will reach out to you within 48 hours of submission.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                
                {/* Player Information */}
                <div className="space-y-6">
                  <h3 className="font-display text-3xl text-white border-l-4 border-primary pl-4">Player Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="firstName" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">First Name *</FormLabel>
                        <FormControl>
                          <Input className="bg-background/50 border-white/10 focus-visible:ring-primary h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="lastName" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Last Name *</FormLabel>
                        <FormControl>
                          <Input className="bg-background/50 border-white/10 focus-visible:ring-primary h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField control={form.control} name="dob" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Date of Birth *</FormLabel>
                        <FormControl>
                          <Input type="date" className="bg-background/50 border-white/10 focus-visible:ring-primary h-12 text-white [color-scheme:dark]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="grade" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Current Grade *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-white/10 focus-visible:ring-primary h-12">
                              <SelectValue placeholder="Select Grade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="8th">8th Grade</SelectItem>
                            <SelectItem value="9th">9th Grade</SelectItem>
                            <SelectItem value="10th">10th Grade</SelectItem>
                            <SelectItem value="11th">11th Grade</SelectItem>
                            <SelectItem value="12th">12th Grade</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="school" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">School Attending *</FormLabel>
                        <FormControl>
                          <Input className="bg-background/50 border-white/10 focus-visible:ring-primary h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                      <FormField control={form.control} name="heightFeet" render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Height (Feet) *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background/50 border-white/10 focus-visible:ring-primary h-12">
                                <SelectValue placeholder="Ft" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[4, 5, 6, 7].map(num => (
                                <SelectItem key={num} value={num.toString()}>{num}'</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="heightInches" render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Height (Inches) *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background/50 border-white/10 focus-visible:ring-primary h-12">
                                <SelectValue placeholder="In" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({length: 12}, (_, i) => i).map(num => (
                                <SelectItem key={num} value={num.toString()}>{num}"</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    
                    <FormField control={form.control} name="positions" render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Preferred Position(s) *</FormLabel>
                        </div>
                        <div className="flex flex-wrap gap-4">
                          {positionsList.map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="positions"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item}
                                    className="flex flex-row items-start space-x-2 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, item])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-white">
                                      {item}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="experience" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Previous Basketball Experience</FormLabel>
                      <FormControl>
                        <Textarea className="bg-background/50 border-white/10 focus-visible:ring-primary min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="h-px w-full bg-white/10" />

                {/* Parent Information */}
                <div className="space-y-6">
                  <h3 className="font-display text-3xl text-white border-l-4 border-primary pl-4">Parent / Guardian Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="parentName" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Full Name *</FormLabel>
                        <FormControl>
                          <Input className="bg-background/50 border-white/10 focus-visible:ring-primary h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="relationship" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Relationship *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-white/10 focus-visible:ring-primary h-12">
                              <SelectValue placeholder="Select Relationship" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Mother">Mother</SelectItem>
                            <SelectItem value="Father">Father</SelectItem>
                            <SelectItem value="Guardian">Guardian</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="parentPhone" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Phone Number *</FormLabel>
                        <FormControl>
                          <Input type="tel" className="bg-background/50 border-white/10 focus-visible:ring-primary h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="parentEmail" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" className="bg-background/50 border-white/10 focus-visible:ring-primary h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </div>

                <div className="h-px w-full bg-white/10" />

                {/* Medical Information */}
                <div className="space-y-6">
                  <h3 className="font-display text-3xl text-white border-l-4 border-primary pl-4">Medical Information</h3>
                  
                  <FormField control={form.control} name="medical" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Medical Conditions / Notes</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Please list any allergies, asthma, or previous injuries..." className="bg-background/50 border-white/10 focus-visible:ring-primary min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <FormField control={form.control} name="insurance" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Insurance Provider</FormLabel>
                      <FormControl>
                        <Input className="bg-background/50 border-white/10 focus-visible:ring-primary h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="h-px w-full bg-white/10" />

                {/* Additional Information */}
                <div className="space-y-6">
                  <h3 className="font-display text-3xl text-white border-l-4 border-primary pl-4">Additional Information</h3>
                  
                  <FormField control={form.control} name="referral" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">How did you hear about APEX?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background/50 border-white/10 focus-visible:ring-primary h-12">
                            <SelectValue placeholder="Select Option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Social Media">Social Media</SelectItem>
                          <SelectItem value="Friend/Family">Friend/Family</SelectItem>
                          <SelectItem value="School">School</SelectItem>
                          <SelectItem value="Coach Referral">Coach Referral</SelectItem>
                          <SelectItem value="Tournament">Tournament</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="pt-8 flex justify-center">
                  <ApexButton type="submit" size="lg" className="w-full md:w-auto md:min-w-[300px]">Submit Registration</ApexButton>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>

    </PageTransition>
  );
}
