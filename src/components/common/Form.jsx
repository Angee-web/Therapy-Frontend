import React from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  borderRadius, // New prop for controlling border radius
  isBtnDisable,
}) => {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name || ""];

    // Determine the border radius class based on the prop
    const borderRadiusClass =
      borderRadius === "rounded-full" ? "rounded-full" : "rounded-md";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            className={borderRadiusClass} // Apply border radius class
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(e) => {
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              });
              
            }}
          />
        );
        break;


         // Dynamic Sizes
         case "dynamicSizes":
          element = (
            <div className="flex flex-col gap-2 border-2 p-2 rounded-md">
              {Array.isArray(value) &&
                value.map((sizeItem, index) => (
                  <div key={index} className="border p-2 rounded-md flex flex-col gap-2">
                    {/* Input for Size */}
                    <Input
                      className={borderRadiusClass}
                      placeholder="Size"
                      value={sizeItem.size}
                      onChange={(e) => {
                        const updatedSizes = value.map((item, i) =>
                          i === index ? { ...item, size: e.target.value } : item
                        );
                        setFormData({ ...formData, [getControlItem.name]: updatedSizes });
                      }}
                    />
                    {/* Nested Colors Array */}
                    {sizeItem.colors.map((colorItem, colorIndex) => (
                      <div key={colorIndex} className="flex gap-2">
                        {/* Input for Color */}
                        <Input
                          type="text"
                          placeholder="Color"
                          value={colorItem.color}
                          onChange={(e) => {
                            const updatedSizes = value.map((item, i) =>
                              i === index
                                ? {
                                    ...item,
                                    colors: item.colors.map((col, ci) =>
                                      ci === colorIndex ? { ...col, color: e.target.value } : col
                                    ),
                                  }
                                : item
                            );
                            setFormData({ ...formData, [getControlItem.name]: updatedSizes });
                          }}
                        />
                        {/* Input for Stock */}
                        <Input
                          type="number"
                          placeholder="Stock"
                          value={colorItem.stock}
                          onChange={(e) => {
                            const updatedSizes = value.map((item, i) =>
                              i === index
                                ? {
                                    ...item,
                                    colors: item.colors.map((col, ci) =>
                                      ci === colorIndex ? { ...col, stock: Number(e.target.value) } : col
                                    ),
                                  }
                                : item
                            );
                            setFormData({ ...formData, [getControlItem.name]: updatedSizes });
                          }}
                        />
                        {/* Button to Remove a Color Entry */}
                        <Button
                          className="bg-red-500 text-white hover:bg-red-700 cursor-pointer"
                          type="button"
                          onClick={() => {
                            const updatedSizes = value.map((item, i) =>
                              i === index
                                ? { ...item, colors: item.colors.filter((_, ci) => ci !== colorIndex) }
                                : item
                            );
                            setFormData({ ...formData, [getControlItem.name]: updatedSizes });
                          }}
                        >
                          Remove Color
                        </Button>
                      </div>
                    ))}
                    {/* Button to Add Another Color */}
                    <Button
                      type="button"
                      className="bg-green-500 text-white hover:bg-green-700 cursor-pointer"
                      onClick={() => {
                        const updatedSizes = value.map((item, i) =>
                          i === index
                            ? { ...item, colors: [...item.colors, { color: "", stock: 0 }] }
                            : item
                        );
                        setFormData({ ...formData, [getControlItem.name]: updatedSizes });
                      }}
                    >
                      Add Color
                    </Button>
                  </div>
                ))}
              {/* Button to Add a New Size */}
              <Button
                type="button"
                className="bg-[#1e3549] text-white hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  const updatedSizes = [...(value || []), { size: "", colors: [{ color: "", stock: 0 }] }];
                  setFormData({ ...formData, [getControlItem.name]: updatedSizes });
                }}
              >
                Add Size
              </Button>
            </div>
          );
          break;


        // dynamic field
        case "dynamic":
          element = (
            <div className="flex flex-col gap-2 border-2 p-1">
              {Array.isArray(value) &&
                value.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 border p-[0.10rem] rounded-md"
                  >
                    <Input
                      className={borderRadiusClass}
                      name={`${getControlItem.name}[${index}].size`}
                      placeholder="Size"
                      value={item.size}
                      onChange={(e) => {
                        const updatedSizes = value.map((sizeItem, i) =>
                          i === index ? { ...sizeItem, size: e.target.value } : sizeItem
                        );
                        setFormData((prev) => ({
                          ...prev,
                          [getControlItem.name]: updatedSizes,
                        }));
                      }}
                    />
                      {/* ✅ Add color picker here */}
                      <Input
                      type="color"
                      className={borderRadiusClass}
                      name={`${getControlItem.name}[${index}].color`}
                      value={item.color || "#000000"} // Default to black if undefined
                      onChange={(e) => {
                        const updatedSizes = value.map((sizeItem, i) =>
                          i === index ? { ...sizeItem, color: e.target.value } : sizeItem
                        );
                        setFormData((prev) => ({
                          ...prev,
                          [getControlItem.name]: updatedSizes,
                        }));
                      }}
                    />
                    <Input
                      className={borderRadiusClass}
                      name={`${getControlItem.name}[${index}].stock`}
                      placeholder="Stock"
                      type="number"
                      value={item.stock}
                      onChange={(e) => {
                        const updatedSizes = value.map((sizeItem, i) =>
                          i === index
                            ? { ...sizeItem, stock: Number(e.target.value) }
                            : sizeItem
                        );
                        setFormData((prev) => ({
                          ...prev,
                          [getControlItem.name]: updatedSizes,
                        }));
                      }}
                    />
                  
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => {
                        const updatedSizes = value.filter((_, i) => i !== index);
                        setFormData((prev) => ({
                          ...prev,
                          [getControlItem.name]: updatedSizes,
                        }));
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              <Button
                type="button"
                onClick={() => {
                  const updatedSizes = [...(value || []), { size: "", stock: 0, color: "#000000" }];
                  setFormData((prev) => ({
                    ...prev,
                    [getControlItem.name]: updatedSizes,
                  }));
                }}
              >
                Add Product Variance
              </Button>
            </div>
          );
          break;
        
        
      case "select":
        element = (
          // this is the shacdn select component
          <Select
            onValueChange={(value) => {
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              });
             
            }}
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((option) => (
                    <SelectItem key={option.id} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

        // dynamic color field
        case "dynamicColor":
  element = (
    <div className="flex flex-col gap-2 border-2 p-1 rounded-md">
      {Array.isArray(value) &&
        value.map((color, index) => (
          <div
            key={index}
            className="flex items-center gap-2 border p-[0.10rem] rounded-md"
          >
            {/* Color Input */}
            <Input
              type="color"
              className={borderRadiusClass}
              name={`${getControlItem.name}[${index}]`}
              value={color}
              onChange={(e) => {
                const updatedColors = value.map((item, i) =>
                  i === index ? e.target.value : item
                );
                setFormData((prev) => ({
                  ...prev,
                  [getControlItem.name]: updatedColors,
                }));
              }}
            />
            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                const updatedColors = value.filter((_, i) => i !== index);
                setFormData((prev) => ({
                  ...prev,
                  [getControlItem.name]: updatedColors,
                }));
              }}
            >
              Remove
            </Button>
          </div>
        ))}
      <Button
        type="button"
        onClick={() => {
          const updatedColors = [...(value || []), "#000000"]; // Add default black color
          setFormData((prev) => ({
            ...prev,
            [getControlItem.name]: updatedColors,
          }));
        }}
      >
        Add Color
      </Button>
    </div>
  );
  break;


        // Textarea
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(e) => {
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              });
             
            }}
            className="resize-none h-32" // Adjust height and disable resizing
          />
        );
        break;

      default:
        element = (
          <Input
            className={borderRadiusClass} // Apply border radius class
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(e) => {
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              });
             
            }}
          />
        );
    }
    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <label className="mb-1" htmlFor={controlItem.name}>
              {controlItem.label}
            </label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button
        // disabled={isBtnDisable}
        type="submit"
        className="mt-2 w-full bg-[linear-gradient(180deg,#C42571_18%,#004DB5_80%)] rounded-full"
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
