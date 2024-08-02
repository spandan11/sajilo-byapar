<div className="flex h-[400px] space-x-2 md:space-x-4">
          {products?.map((product) => (
            <Card
              key={product.id}
              className="group relative overflow-hidden rounded-lg shadow-lg"
            >
              <div className="relative h-[300px]">
                <Image
                  src="/placeholder.svg"
                  alt="Product Image"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
                <div className="absolute right-4 top-4 cursor-pointer rounded-full bg-gray-900 p-2 text-white">
                  <Heart className="h-4 w-4" />
                </div>
              </div>
              <CardFooter className="flex flex-row items-start justify-between space-y-2 bg-white p-4 dark:bg-gray-950">
                <div className="flex flex-col items-start justify-center">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  {/* <Badge className="text-xs font-thin">Fashion statement</Badge> */}
                  {/* <p className="border text-sm text-gray-500 dark:text-gray-400"></p> */}
                  <h4 className="text-sm font-semibold">$89.99</h4>
                </div>
                <Button
                  size="lg"
                  variant="ghost"
                  className="rounded-full border bg-accent/80 p-4 hover:bg-accent"
                >
                  <ShoppingCart className="h-6 w-6" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
