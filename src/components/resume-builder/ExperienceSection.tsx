"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { GripVertical, Plus, Trash2 } from "lucide-react";

export default function ExperienceSection() {
  const { data, setResumeData, addExperience, updateExperience, removeExperience } = useResumeStore();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(data.experience);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setResumeData({ ...data, experience: items });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <h2 className="text-xl font-bold">Experience</h2>
        <Button variant="outline" size="sm" onClick={addExperience}>
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="experience-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {data.experience.map((item, index) => (
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
                            <Label>Company</Label>
                            <Input
                              value={item.company}
                              onChange={(e) => updateExperience(item.id, { company: e.target.value })}
                              placeholder="Google"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity mt-8"
                            onClick={() => removeExperience(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Role</Label>
                            <Input
                              value={item.role}
                              onChange={(e) => updateExperience(item.id, { role: e.target.value })}
                              placeholder="Software Engineer"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                              <Label>Start Date</Label>
                              <Input
                                type="month"
                                value={item.startDate}
                                onChange={(e) => updateExperience(item.id, { startDate: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>End Date</Label>
                              <Input
                                type="month"
                                value={item.endDate}
                                disabled={item.current}
                                onChange={(e) => updateExperience(item.id, { endDate: e.target.value })}
                              />
                              <div className="flex items-center gap-2 mt-1">
                                <input
                                  type="checkbox"
                                  id={`current-${item.id}`}
                                  checked={item.current}
                                  onChange={(e) => updateExperience(item.id, { current: e.target.checked, endDate: e.target.checked ? "" : item.endDate })}
                                  className="rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <Label htmlFor={`current-${item.id}`} className="text-xs font-normal">Present</Label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={item.description}
                            onChange={(e) => updateExperience(item.id, { description: e.target.value })}
                            placeholder="Developed features using React..."
                            rows={4}
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
      
      {data.experience.length === 0 && (
        <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground">
          No experience added yet. Click "Add Experience" to get started.
        </div>
      )}
    </section>
  );
}
