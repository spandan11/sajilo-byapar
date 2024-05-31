"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Check,
  ChevronLeft,
  ChevronsUpDown,
  EyeIcon,
  EyeOff,
  MailCheck,
  MailOpen,
  X,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import SiteLogo from "@/components/Logo";
import { MultiFormSteps as steps } from "@/constants/auth-data";
import {
  RegisterFormSchema,
  RegisterFormSchemaType,
} from "@/schema/authSchema";
import { api } from "@/trpc/react";
import { toast } from "sonner";

const RegisterPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [view, setView] = useState(false);
  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      storeName: "",
      storeType: "",
      fullName: "",
      email: "",
      phoneNo: "",
      password: "",
    },
  });
  const storeQuery = api.store.checkStore.useQuery({
    storeName: form.getValues("storeName"),
  });

  const handleStoreTypeChange = useCallback(
    (value: string) => {
      form.setValue("storeType", value);
    },
    [form.getValues("storeType")],
  );

  type FieldName = keyof RegisterFormSchemaType;

  const next = async () => {
    const fields = steps[currentStep]?.fields;
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep === steps.length - 3) {
      if (storeQuery.isError) {
        toast.error(storeQuery.error.message);
      }
      if (storeQuery.isSuccess) {
        toast.success(storeQuery.data.message);
      }
      // const {
      //   data,
      //   error: storeError,
      //   trpc,
      // } = api.store.checkStore.useQuery({
      //   storeName: form.getValues("storeName"),
      // });
      // if (storeError) {
      //   return toast.error("fkajfds");
      // }
    }

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await form.handleSubmit(onSubmit)();
      }
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  const onSubmit: SubmitHandler<RegisterFormSchemaType> = (values) => {
    console.log(values);
    form.reset();
  };
  return (
    <Card className="w-4/5 space-y-4 rounded-md border-0 p-0 shadow-2xl md:w-1/2 md:px-8 md:py-4">
      <CardHeader className="flex h-1/5 flex-row items-center justify-between space-y-2">
        <CardTitle>
          <SiteLogo />
        </CardTitle>
        <X onClick={() => router.push("/")} className="cursor-pointer" />
      </CardHeader>
      <CardContent className="grid h-4/5 gap-4">
        <Progress value={50} className="mb-2 h-2" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-full space-y-8"
          >
            {currentStep === 0 && (
              <>
                <FormField
                  control={form.control}
                  name="storeName"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row items-center justify-between">
                        <FormLabel>
                          Store Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormMessage className="text-xs" />
                      </div>
                      <FormControl>
                        <Input placeholder="e.g. Hamro Pasal" {...field} />
                      </FormControl>
                      <FormDescription className="text-xs">
                        You can change this from dashboard settings later
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="storeType"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>
                        Store Type <span className="text-red-500">*</span>
                      </FormLabel>
                      <StoreTypePicker
                        onChange={handleStoreTypeChange}
                        fieldValue={field.value}
                      />
                      <FormDescription className="text-xs">
                        Select the type of store you want to create
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </>
            )}
            {currentStep === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row items-center justify-between">
                        <FormLabel>
                          FullName <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormMessage className="text-xs" />
                      </div>
                      <FormControl>
                        <Input placeholder="e.g. John doe" {...field} />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Your full name
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div className="flex flex-row items-center justify-between">
                          <FormLabel>Email</FormLabel>
                          <FormMessage className="text-xs" />
                        </div>
                        <FormControl>
                          <Input
                            placeholder="e.g. johndoe@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          You
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNo"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div className="flex flex-row items-center justify-between">
                          <FormLabel>Contact Number</FormLabel>
                          <FormMessage className="text-xs" />
                        </div>
                        <FormControl>
                          <Input placeholder="e.g. 9812345678" {...field} />
                        </FormControl>
                        <FormDescription className="text-xs">
                          You
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <FormMessage className="text-xs" />
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="********"
                            {...field}
                            type={view ? "text" : "password"}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1.5"
                            asChild
                          >
                            {view ? (
                              <EyeIcon
                                className="h-7 w-7 cursor-pointer p-1 text-foreground transition"
                                onClick={() => setView((prev) => !prev)}
                              />
                            ) : (
                              <EyeOff
                                className="h-7 w-7 cursor-pointer p-1 text-foreground transition"
                                onClick={() => setView((prev) => !prev)}
                              />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        Kepp a secure password
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </>
            )}
            {currentStep === 2 && (
              <div className="flex w-full flex-col items-center justify-center gap-2 py-6">
                <MailCheck className="h-24 w-24 p-2 text-foreground" />
                <Button size="lg">Send Verification</Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex h-1/5 items-center justify-between">
        {currentStep > 0 && currentStep < steps.length - 1 && (
          <Button onClick={prev} variant="ghost">
            <ChevronLeft className="h-6 w-6 p-1" />
            Back
          </Button>
        )}
        {currentStep !== steps.length - 1 && (
          <Button onClick={next} className="ml-auto">
            Next
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RegisterPage;

const storeTypes = [
  {
    id: 1,
    name: "General",
    Svalue: "general",
  },
  {
    id: 2,
    name: "Fashion & shoes",
    Svalue: "fashion & shoes",
  },
  {
    id: 3,
    name: "Beauty & cosmetics",
    Svalue: "beauty & cosmetics",
  },
  {
    id: 4,
    name: "Plants & nursery",
    Svalue: "plants & nursery",
  },
  {
    id: 5,
    name: "Gym & sports",
    Svalue: "gym & sports",
  },
];
function StoreTypePicker({
  onChange,
  fieldValue,
}: {
  onChange: (value: string) => void;
  fieldValue: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(fieldValue);

  useEffect(() => {
    if (!value) return;
    onChange(value); //when the value changes,onChange callback is called
  }, [onChange, value]);

  const selectedStoreType = storeTypes.find(
    (storetype) => storetype.name === value,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedStoreType ? selectedStoreType.name : "Select StoreType"}
          <ChevronsUpDown className="ml-2 h-8 w-8 shrink-0 p-2 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CommandInput placeholder="search store type..." />
          <CommandGroup>
            <CommandList className="w-full">
              {storeTypes.map((storeType) => (
                <CommandItem
                  key={storeType.id}
                  className="w-full"
                  onSelect={() => {
                    setValue(storeType.name);
                    setOpen((prev) => !prev);
                  }}
                >
                  <span className="text-sm text-foreground">
                    {storeType.name}
                  </span>
                  <Check
                    className={cn(
                      "ml-2 h-4 w-4 opacity-0",
                      value === storeType.name && "opacity-100",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
