"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { GripVertical, Plus, Trash2 } from "lucide-react";

export default function EducationSection() {
  const { data, setResumeData, addEducation, updateEducation, removeEducation } = useResumeStore();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(data.education);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setResumeData({ ...data, education: items });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <h2 className="text-xl font-bold">Education</h2>
        <Button variant="outline" size="sm" onClick={addEducation}>
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="education-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {data.education.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...(provided.draggableProps as any)}
                      className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm relative group flex gap-4"
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground mt-8"
                      >
                        <GripVertical className="w-5 h-5" />
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2 flex-1 mr-4">
                            <Label>School / University</Label>
                            <Input
                              value={item.school}
                              onChange={(e) => updateEducation(item.id, { school: e.target.value })}
                              placeholder="Harvard University"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity mt-8"
                            onClick={() => removeEducation(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Degree</Label>
                            <Input
                              value={item.degree}
                              onChange={(e) => updateEducation(item.id, { degree: e.target.value })}
                              placeholder="B.S. Computer Science"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                              <Label>Start Date</Label>
                              <Input
                                type="month"
                                value={item.startDate}
                                onChange={(e) => updateEducation(item.id, { startDate: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>End Date</Label>
                              <Input
                                type="month"
                                value={item.endDate}
                                onChange={(e) => updateEducation(item.id, { endDate: e.target.value })}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={item.description}
                            onChange={(e) => updateEducation(item.id, { description: e.target.value })}
                            placeholder="GPA: 3.9/4.0. Relevant coursework..."
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      {data.education.length === 0 && (
        <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground">
          No education added yet. Click "Add Education" to get started.
        </div>
      )}
    </section>
  );
}
