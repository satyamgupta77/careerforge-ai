"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

export default function LanguagesSection() {
  const { data, addLanguage, updateLanguage, removeLanguage, setResumeData } = useResumeStore();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(data.languages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setResumeData({ ...data, languages: items });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <h2 className="text-xl font-bold">Languages</h2>
        <Button onClick={addLanguage} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-2" /> Add Language
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="languages">
          {(provided: any) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {data.languages.map((lang, index) => (
                <Draggable key={lang.id} draggableId={lang.id} index={index}>
                  {(provided: any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center gap-3 p-3 border border-border rounded-lg bg-slate-50/50 dark:bg-zinc-900/50"
                    >
                      <div {...provided.dragHandleProps} className="cursor-grab text-muted-foreground hover:text-foreground">
                        <GripVertical className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Language</Label>
                          <Input
                            value={lang.name}
                            onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
                            placeholder="English"
                            className="h-8"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Proficiency</Label>
                          <Input
                            value={lang.proficiency}
                            onChange={(e) => updateLanguage(lang.id, { proficiency: e.target.value })}
                            placeholder="Native / Bilingual"
                            className="h-8"
                          />
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeLanguage(lang.id)}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0 mt-4"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
}
