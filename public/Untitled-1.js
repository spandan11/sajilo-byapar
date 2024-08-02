 <div className="flex h-[400px] space-x-2 md:space-x-4">
          {products?.map((product) => (
            <Card className="group relative overflow-hidden rounded-lg shadow-lg">
              {/* <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View Product</span>
              </Link> */}
              <CardContent className="h-[300px] object-cover">
                <Image
                  src="/placeholder.svg"
                  alt="Product Image"
                  width={400}
                  height={400}
                  className="aspect-square h-[400px] w-[400px] object-cover"
                />
              </CardContent>
              <CardFooter className="bg-white p-4 dark:bg-gray-950">
                <div className="absolute right-4 top-4 rounded-full bg-gray-900 p-2 text-white">
                  <Heart className="h-4 w-4" />
                </div>
                <h3 className="text-lg font-bold">Designer Handbag</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Fashion statement
                </p>
                <h4 className="text-base font-semibold md:text-lg">$89.99</h4>
              </CardFooter>
            </Card>
            // <div
            //   key={product.id}
            //   className="relative h-[400px] w-[250px] cursor-pointer rounded-md border px-0 py-4 transition hover:shadow-xl"
            // >
            //   <div className="h-[200px] w-full overflow-hidden bg-red-500">
            //     <Image
            //       src={
            //         "https://utfs.io/f/157bf1f5-e4fe-465e-91ec-10fd32d319b7-3ul91i.jpg"
            //       }
            //       alt="Product Image"
            //       width={300}
            //       height={300}
            //       onLoad={() => setLoaded(true)}
            //       className={`h-full w-full object-cover ${loaded ? "blur-none" : "blur-md"}`}
            //     />
            //     <div className="absolute right-2 top-2 rounded-full bg-gray-900 p-2 text-white">
            //       <Heart
            //         className="h-6 w-6 cursor-pointer"
            //         // onClick={() => setImage("")}
            //       />
            //     </div>
            //   </div>
            //   <div className="p-4 dark:bg-gray-950">
            //     <h3 className="text-lg font-bold">Designer Handbag</h3>
            //     <p className="text-sm text-gray-500 dark:text-gray-400">
            //       Fashion statement
            //     </p>
            //     <h4 className="text-base font-semibold md:text-lg">$89.99</h4>
            //   </div>
            //   {/* <p className="text-center text-sm">{product.name}</p> */}
            // </div>
            // <div className="group relative overflow-hidden rounded-lg shadow-lg">
            //   <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            //     <span className="sr-only">View Product</span>
            //   </Link>
            //   <Image
            //     src="/placeholder.svg"
            //     alt="Product Image"
            //     width={400}
            //     height={400}
            //     className="aspect-square w-full object-cover"
            //   />
            //   <div className="absolute right-4 top-4 rounded-full bg-gray-900 p-2 text-white">
            //     <Heart className="h-4 w-4" />
            //   </div>
            //   <div className="bg-white p-4 dark:bg-gray-950">
            //     <h3 className="text-lg font-bold">Designer Handbag</h3>
            //     <p className="text-sm text-gray-500 dark:text-gray-400">
            //       Fashion statement
            //     </p>
            //     <h4 className="text-base font-semibold md:text-lg">$89.99</h4>
            //   </div>
            // </div>
          ))}
        </div>